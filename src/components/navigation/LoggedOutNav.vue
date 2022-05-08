<script setup>
import NavItemVue from './navbar/NavItem.vue';
</script>

<template>
    <nav class="flex space-x-10 justify-center px-5 pt-2">
        <NavItemVue path="/login" text="Login" name="Login" />
        <NavItemVue path="/signup" text="Sign Up" name="Sign Up" />
    </nav>
</template>