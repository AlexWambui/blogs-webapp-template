<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import type { FormKitNode } from '@formkit/core';
import { useBlogStore } from '@/store/blog';
import type { BlogForm } from '@/types';

const route = useRoute();
const blogStore = useBlogStore();

const handleUpdate = (payload: BlogForm, node?: FormKitNode) => {
    blogStore.updateBlog(String(route.params.slug), payload, node);
}

watch (
    () => route.params.slug, 
    (slug) => blogStore.getBlog(String(slug)), 
    {immediate: true}
);
</script>

<template>
    <div v-if="blogStore.blog" class="form edit_blog_form">
        <div class="header">
            <RouterLink to="/blogs">&larr;</RouterLink>
            <h1>Edit Blog: {{ blogStore.blog.title }}</h1>
        </div>

        <div class="form-wrapper">
            <FormKit type="form" @submit="handleUpdate" submit-label="Update">
                <div class="inputs-group">
                    <FormKit type="text" label="Title" name="title" :value="blogStore.blog.title" />
                </div>
                <div class="inputs-group">
                    <FormKit type="textarea" label="Body" name="body" :value="blogStore.blog.body" />
                </div>
            </FormKit>
        </div>
    </div>
</template>