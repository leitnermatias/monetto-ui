<script setup>
import NavItemVue from './navbar/NavItem.vue';
</script>

<template>
    <nav class="flex space-x-10 justify-start px-5 pt-2">
        <NavItemVue path="/" text="Home" name="Home" />
        <NavItemVue path="/login" text="Login" name="Login" />
        <NavItemVue path="/signup" text="Sign Up" name="Sign Up" />
    </nav>
</template>