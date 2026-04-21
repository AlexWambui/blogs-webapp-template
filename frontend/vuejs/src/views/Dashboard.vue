<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div>
        <p class="text-lg text-slate-200">Welcome back, {{ auth.user?.name }}</p>
        <p class="text-lg text-slate-200">{{ auth.user?.email }}</p>
    </div>
    <button @click="auth.logout" class="btn btn-primary">Logout</button>
  </main>
</template>
