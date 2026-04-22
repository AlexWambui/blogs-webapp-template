import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import type { FormKitNode } from '@formkit/core';
import { axiosInstance, sanctumClient } from '@/lib/axios';
import router from '@/router';
import type { LaravelResponseCollection, Blog, BlogForm } from '@/types';

export const useBlogStore = defineStore("blog", () => {
    const blogsCollection = ref<LaravelResponseCollection<Blog> | null>(null);
    const blog = ref<Blog | null>(null);
    const isLoading = ref<boolean>(false);

    const createBlog = async (payload: BlogForm, node?: FormKitNode) => {
        try {
            await axiosInstance.post('/blogs', payload);
            await router.push('/blogs');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response.data.errors);
            }
        }
    }

    const getBlogs = async (page: number) => {
        isLoading.value = true;
        try {
            const { data } = await axiosInstance.get(`/blogs?page=${page}`);
            blogsCollection.value = await data;
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    };

    const getBlog = async (slug: string) => {
        isLoading.value = true;
        try {
            const { data } = await axiosInstance.get(`/blogs/${slug}`);
            blog.value = data.data;
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    };

    const updateBlog = async (slug: string, payload: BlogForm, node?: FormKitNode) => {
        try {
            await axiosInstance.put(`/blogs/${slug}`, payload);
            await router.push('/blogs');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response?.data.errors);
            }
        }
    };

    const deleteBlog = async (slug: string) => {
        isLoading.value = true;
        try {
            await axiosInstance.delete(`/blogs/${slug}`);
            // Don't fetch here - let the component handle it
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        blogsCollection,
        blog,
        isLoading,
        getBlogs,
        getBlog,
        createBlog,
        updateBlog,
        deleteBlog,
    }
});