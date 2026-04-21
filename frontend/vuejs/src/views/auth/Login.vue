<script setup lang="ts">
import type { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import type { LoginForm } from '@/types';
import router from '@/router';

const login = async (payload: LoginForm, node?: FormKitNode) => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000"
    });

    try {
        await axiosInstance.post('/login', payload);
        router.push('/dashboard');
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            node?.setErrors([], e.response.data.errors);
        }
    }
};
</script>

<template>
    <div class="form user_login_form">
        <div class="header">
            <h1>Login</h1>
        </div>

        <div class="form-wrapper">
            <FormKit type="form" @submit="login" submit-label="Login">
                <div class="inputs-group">
                    <FormKit type="email" label="Email" name="email" />
                </div>
                <div class="inputs-group">
                    <FormKit type="password" label="Password" name="password" />
                </div>
            </FormKit>
        </div>
    </div>
</template>