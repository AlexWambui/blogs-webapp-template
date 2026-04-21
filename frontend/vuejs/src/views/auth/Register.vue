<script setup lang="ts">
import type { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import type { RegisterForm } from '@/types';
import router from '@/router';

const register = async (payload: RegisterForm, node?:FormKitNode) => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000"
    });

    try {
        await axiosInstance.post('/register', payload);
        router.push('/dashboard');
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            node?.setErrors([], e.response.data.errors);
        }
    }
};
</script>

<template>
    <div class="form user_registration_form">
        <div class="header">
            <h1>Sign Up</h1>
        </div>

        <div class="form-wrapper">
            <FormKit type="form" @submit="register" submit-label="Sign Up">
                <div class="inputs-group">
                    <FormKit type="text" label="Full Name" name="name" />
                </div>

                <div class="inputs-group">
                    <FormKit type="email" label="Email" name="email" />
                </div>

                <div class="inputs-group">
                    <FormKit type="password" label="Password" name="password" />
                </div>

                <div class="inputs-group">
                    <FormKit type="password" label="Confirm Password" name="password_confirmation" />
                </div>
            </FormKit>
        </div>
    </div>
</template>