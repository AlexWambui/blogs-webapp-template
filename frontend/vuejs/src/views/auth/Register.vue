<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const { register } = useAuthStore();
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