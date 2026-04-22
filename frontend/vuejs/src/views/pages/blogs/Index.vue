<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import { EyeIcon, PencilIcon } from '@heroicons/vue/24/solid';
import axiosInstance from '@/lib/axios';
import type { BlogData } from '@/types';

const blogs = ref<BlogData>({
    data: [],
    links: {},
    meta: {},
});

const getBlogs = async (page = 1) => {
    const { data } = await axiosInstance.get(`/blogs?page=${page}`);
    blogs.value = await data;
    console.log(blogs.value);
};

onMounted(async () => {
    await getBlogs();
});
</script>

<template>
    <div class="header">
        <h1>Blogs</h1>
        <RouterLink to="/blogs/create">New Blog</RouterLink>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Is Published</th>
                    <th>Created At</th>
                    <th class="thead-actions">Actions</th>                    
                </tr>
            </thead>

            <tbody>
                <template v-if="blogs">
                    <tr v-for="blog in blogs.data" :key="blog.id">
                        <td>{{ blog.id }}</td>
                        <td>{{ blog.title }}</td>
                        <td>{{ blog.slug }}</td>
                        <td>{{ blog.is_published ? 'Published' : 'Draft' }}</td>
                        <td>{{ blog.created_at }}</td>
                        <td class="tbody-actions">
                            <div class="actions">
                                <RouterLink :to="{ name: 'ViewBlog', params: {slug: blog.slug} }">
                                    <EyeIcon class="w-5 h-5" />
                                </RouterLink>

                                <RouterLink :to="{ name: 'EditBlog', params: {slug: blog.slug} }">
                                    <PencilIcon class="w-5 h-5" />
                                </RouterLink>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <TailwindPagination
            :data="blogs"
            @pagination-change-page="getBlogs"
        />
    </div>
</template>