<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header class="top-navbar">
        <nav class="container">
            <div class="nav-section">
                <RouterLink to="/">Home</RouterLink>
            </div>

            <div class="nav-section">
                <RouterLink to="/dashboard">Dashboard</RouterLink>
                <RouterLink to="/blogs">Blogs</RouterLink>
            </div>

            <div class="nav-section">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </div>
        </nav>
    </header>

    <main class="min-h-screen py-4 px-4 lg:px-16">
        <div class="mb-6">
            <RouterView />
        </div>
    </main>
</template>
