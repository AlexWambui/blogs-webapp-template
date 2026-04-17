<script setup lang="ts">
import { reactive } from 'vue';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const form = reactive<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const errors = reactive({
    name: [] as string[],
    email: [] as string[],
    password: [] as string[],
})

const register = async (payload: RegisterForm) => {
    // Clear previous errors before new request
    errors.name = [];
    errors.email = [];
    errors.password = [];

    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000"
    });

    try {
        await axiosInstance.post('/register', payload);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            errors.name = e.response.data.errors.name;
            errors.email = e.response.data.errors.email;
            errors.password = e.response.data.errors.password;
        }
    }
};
</script>

<template>
    <div class="form">
        <div class="header">
            <h1>Sign Up</h1>
        </div>

        <div class="user_registration_form">
            <form @submit.prevent="register(form)">
                <div class="inputs-group">
                    <label for="name">Full Name</label>
                    <input type="text" v-model="form.name" id="name" />
                    <template v-if="errors.name && errors.name.length">
                        <span v-for="error in errors.name" :key="error" class="form-input-error">{{ error }}</span>
                    </template>
                </div>

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

                <div class="inputs-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" v-model="form.password_confirmation" id="password_confirmation" />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>