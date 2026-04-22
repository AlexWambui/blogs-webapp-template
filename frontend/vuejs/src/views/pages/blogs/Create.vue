<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useBlogStore } from '@/store/blog';

const { createBlog } = useBlogStore();
</script>

<template>
    <div class="form create_blog_form">
        <div class="header">
            <RouterLink to="/blogs">&larr;</RouterLink>
            <h1>Create Blog</h1>
        </div>

        <div class="form-wrapper">
            <FormKit type="form" @submit="createBlog" submit-label="Create">
                <div class="inputs-group">
                    <FormKit type="text" label="Title" name="title" />
                </div>
                <div class="inputs-group">
                    <FormKit type="textarea" label="Body" name="body" />
                </div>
            </FormKit>
        </div>
    </div>
</template>