<script setup>
import LoggedInNavItemVue from './navbar/LoggedInNavItem.vue';
import Notifications from './navbar/Notifications.vue';
import LogoutButton from "./navbar/LogoutButton.vue";
import { HomeIcon, UserCircleIcon, CurrencyDollarIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/vue/solid';

</script>

<template>
    <nav class="flex flex-col pt-4 px-2">
        <Notifications/>
        <LogoutButton/>
        <LoggedInNavItemVue path="/" text="Home" name="Home" :children="[]" >
            <template #icon>
                <HomeIcon class="w-5 h-5"/>
            </template>
        </LoggedInNavItemVue>
        <LoggedInNavItemVue path="/profile" text="Profile" name="Profile" :children="[]" >
            <template #icon>
                <UserCircleIcon class="w-5 h-5"/>
            </template>
        </LoggedInNavItemVue>
        <LoggedInNavItemVue path="/accounts" text="Accounts" name="Accounts" :children="[]" >
            <template #icon>
                <CurrencyDollarIcon class="w-5 h-5"/>
            </template>
        </LoggedInNavItemVue>
        <LoggedInNavItemVue path="/earnings" text="Earnings" name="Earnings" :children="[]" >
            <template #icon>
                <TrendingUpIcon class="w-5 h-5"/>
            </template>
        </LoggedInNavItemVue>
        <LoggedInNavItemVue path="/expenses" text="Expenses" name="Expenses" :children="[]" >
            <template #icon>
                <TrendingDownIcon class="w-5 h-5"/>
            </template>
        </LoggedInNavItemVue>

    </nav>
</template>