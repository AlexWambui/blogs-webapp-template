<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import axiosInstance from '@/lib/axios';

type Blog = {
    id: number;
    title: string;
    slug: string;
    body: string;
    is_published: boolean;
    created_at: string;
};

type BlogData = {
    data: Blog[];
    links: any;
    meta: any;
};

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
                        <td class="tbody-actions">Edit | Delete</td>
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