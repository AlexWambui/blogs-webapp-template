<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/lib/axios';
import router from '@/router';
import type { User } from '@/types';

const user = ref<User | null>(null);

const getUser = async () => {
    try {
        const response = await axiosInstance.get("/user");
        user.value = response.data;
    } catch (error: any) {
        console.error(error);
        if (error.response?.status  === 401) {
            router.push('/login');
        }
    }
};

const logout = async () => {
    try {
        const response = await axiosInstance.post("/logout");
        user.value = null;
        router.push('/login');
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getUser();
});
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div>
        <p class="text-lg text-slate-200">Welcome back, {{ user?.name }}</p>
        <p class="text-lg text-slate-200">{{ user?.email }}</p>
    </div>
    <button @click="logout" class="btn btn-primary">Logout</button>
  </main>
</template>
