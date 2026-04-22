<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/lib/axios';
import type { Blog } from '@/types';
import { useBlogStore } from '@/store/blog';

const route = useRoute();
const blogStore = useBlogStore();

watch (
    () => route.params.slug, 
    (slug) => blogStore.getBlog(String(slug)), 
    {immediate: true}
);
</script>

<template>
    <h1>{{ blogStore.blog?.title }}</h1>
    <span>Created: {{ blogStore.blog?.created_at }}</span>
    <div class="body">
        <p>{{ blogStore.blog?.body }}</p>
    </div>
</template>