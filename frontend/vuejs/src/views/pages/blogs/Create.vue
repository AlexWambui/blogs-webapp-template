<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import router from '@/router';

type BlogForm = {
    title: string;
    body: string;
}

const createBlog = async (payload: BlogForm, node?: FormKitNode) => {
    try {
        await axiosInstance.post('/blogs', payload);
        router.push('/blogs');
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            node?.setErrors([], e.response.data.errors);
        }
    }
}
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