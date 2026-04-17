<script setup lang="ts">
import axios from 'axios';

const register = async () => {
    console.log('Registering...');

    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
    });

    try {
        const response = await axios.post('http://localhost:8000/api/register', {
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'password',
            password_confirmation: 'password',
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

register();
</script>

<template>
    <h1>Register</h1>
</template>