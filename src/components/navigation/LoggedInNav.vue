<script setup>
import LoggedInNavItemVue from './navbar/LoggedInNavItem.vue';
import {LogoutIcon} from "@heroicons/vue/outline"
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();

function logout() {
    store.commit('logout');
    axios.post("/auth/signout")
    router.push({name: "Home"})
}


</script>

<template>
    <nav class="flex flex-col pt-4 px-2">
        <div class="flex justify-center m-auto">
            <button @click="logout" class="mb-2 p-1 flex align-middle justify-center items-center border-b-2 gap-1 rounded shadow border-slate-500 hover:border-orange-300 hover:shadow-inner hover:gap-0"><LogoutIcon class="h-5 w-5 text-slate-600"/>Logout</button>
        </div>
        <LoggedInNavItemVue path="/" text="Home" name="Home" />
        <LoggedInNavItemVue path="/profile" text="Profile" name="Profile"/>
    </nav>
</template>