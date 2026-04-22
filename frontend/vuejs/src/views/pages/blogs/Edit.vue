<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import type { Blog } from '@/types';
import router from '@/router';

const route = useRoute();
const blog = ref<Blog | null>(null);

const getBlog = async (slug: string) => {
    try {
        const { data } = await axiosInstance.get(`/blogs/${slug}`);
        blog.value = data.data;
    } catch (e) {
        console.error(e);
    }
};

const updateBlog = async (payload: Blog, node?: FormKitNode) => {
    if (blog.value) {
        try {
            await axiosInstance.put(`/blogs/${blog.value?.slug}`, payload);
            router.push('/blogs');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response?.data.errors);
            }
        }
    }
};

watch (
    () => route.params.slug, 
    (slug) => {
        if (slug) {
            getBlog(String(slug));
        }
    }, 
    {immediate: true}
);
</script>

<template>
    <div v-if="blog" class="form edit_blog_form">
        <div class="header">
            <RouterLink to="/blogs">&larr;</RouterLink>
            <h1>Edit Blog: {{ blog.title }}</h1>
        </div>

        <div class="form-wrapper">
            <FormKit type="form" @submit="updateBlog" submit-label="Update">
                <div class="inputs-group">
                    <FormKit type="text" label="Title" name="title" :value="blog.title" />
                </div>
                <div class="inputs-group">
                    <FormKit type="textarea" label="Body" name="body" :value="blog.body" />
                </div>
            </FormKit>
        </div>
    </div>
</template>