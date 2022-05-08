<script setup>
import LoggedInNavItemVue from './navbar/LoggedInNavItem.vue';
import Notifications from './navbar/Notifications.vue';
import LogoutButton from "./navbar/LogoutButton.vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();

</script>

<template>
    <nav class="flex flex-col pt-4 px-2">
        <Notifications/>
        <LogoutButton/>
        <LoggedInNavItemVue path="/" text="Home" name="Home" />
        <LoggedInNavItemVue path="/profile" text="Profile" name="Profile"/>
    </nav>
</template>