<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/lib/axios';
import type { Blog } from '@/types';

const route = useRoute();
const blog = ref<Blog | null>(null);

const getBlog = async (id: string | string[]) => {
    try {
        const { data } = await axiosInstance.get(`/blogs/${id}`);
        blog.value = data.data;
    } catch (e) {
        console.error(e);
    }
};

watch (
    () => route.params.id, 
    (id) => {
        if (id) {
            getBlog(id);
        }
    }, 
    {immediate: true}
);
</script>

<template>
    <h1>{{ blog?.title }}</h1>
    <span>Created: {{ blog?.created_at }}</span>
    <div class="body">
        <p>{{ blog?.body }}</p>
    </div>
</template>