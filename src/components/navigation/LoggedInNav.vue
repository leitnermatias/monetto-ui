<script setup>
import LoggedInNavItemVue from './navbar/LoggedInNavItem.vue';
import Notifications from './navbar/Notifications.vue';
import LogoutButton from "./navbar/LogoutButton.vue";

</script>

<template>
    <nav class="flex flex-col pt-4 px-2">
        <Notifications/>
        <LogoutButton/>
        <LoggedInNavItemVue path="/" text="Home" name="Home" />
        <LoggedInNavItemVue path="/profile" text="Profile" name="Profile"/>
        <LoggedInNavItemVue path="/accounts" text="Accounts" name="Accounts"/>

    </nav>
</template>