<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <div class="dark:bg-[--color-background]">
            <nav class="container mx-auto flex items-center justify-between p-4">
                <div class="flex gap-4">
                    <RouterLink to="/" class="text-slate-200">Home</RouterLink>
                    <RouterLink to="/dashboard" class="text-slate-200">Dashboard</RouterLink>
                </div>
                <div class="flex gap-4">
                    <RouterLink to="/login" class="text-slate-200">Login</RouterLink>
                    <RouterLink to="/register" class="text-slate-200">Register</RouterLink>
                </div>
            </nav>
        </div>
    </header>

    <main class="max-w-6xl mx-auto min-h-screen p-4">
        <div class="mb-6">
            <RouterView />
        </div>
    </main>
</template>
