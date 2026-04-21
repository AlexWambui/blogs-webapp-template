<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const { login } = useAuthStore();
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