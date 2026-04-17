<script setup lang="ts">
import { reactive } from 'vue';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';

interface LoginForm {
    email: string;
    password: string;
};

const form = reactive<LoginForm>({
    email: '',
    password: ''
});

const errors = reactive({
    email: [],
    password: [],
});

const login = async (payload: LoginForm) => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000"
    });

    errors.email = [];
    errors.password = [];

    try {
        await axiosInstance.post('/login', payload);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            errors.email = e.response.data.errors.email;
            errors.password = e.response.data.errors.password;
        }
    }
};
</script>

<template>
    <div class="form">
        <div class="header">
            <h1>Login In</h1>
        </div>

        <div class="user_login_form">
            <form @submit.prevent="login(form)">
                <div class="inputs-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="form.email" id="email" />
                    <template v-if="errors.email && errors.email.length">
                        <span v-for="error in errors.email" :key="error" class="form-input-error">{{ error }}</span>
                    </template>
                </div>

                <div class="inputs-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="form.password" id="password" />
                    <template v-if="errors.password && errors.password.length">
                        <span v-for="error in errors.password" :key="error" class="form-input-error">{{ error }}</span>
                    </template>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>