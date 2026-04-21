import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import type { FormKitNode } from '@formkit/core';
import { axiosInstance, sanctumClient } from '@/lib/axios';
import router from '@/router';
import type { User, RegisterForm, LoginForm } from '@/types';

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);

    const register = async (payload: RegisterForm, node?:FormKitNode) => {
        await sanctumClient.get('/sanctum/csrf-cookie');

        try {
            await axiosInstance.post('/register', payload);
            await getUser();
            router.push('/dashboard');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response.data.errors);
            }
        }
    };

    const login = async (payload: LoginForm, node?: FormKitNode) => {
        await sanctumClient.get('/sanctum/csrf-cookie');

        try {
            await axiosInstance.post('/login', payload);
            await getUser();
            router.push('/dashboard');
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response.data.errors);
            }
        }
    };

    const getUser = async () => {
        try {
            const response = await axiosInstance.get("/user");
            user.value = response.data;
            isLoggedIn.value = true;
        } catch (error: any) {
            console.error(error);
            if (error.response?.status  === 401) {
                router.push('/login');
            }
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/logout");
            user.value = null;
            isLoggedIn.value = false;
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const cleanState = () => {
        user.value = null;
        isLoggedIn.value = false;
    };

    return {
        user,
        isLoggedIn,
        register,
        login,
        getUser,
        logout,
        cleanState,
    };
    }, {
        persist: {
            storage: sessionStorage,
            pick: ["user", "isLoggedIn"],
        }
    }
);