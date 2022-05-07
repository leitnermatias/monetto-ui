<script setup>
import LoggedInNavItemVue from './navbar/LoggedInNavItem.vue';
import {LogoutIcon, BellIcon} from "@heroicons/vue/outline"
import Error from '../Error.vue';
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
        <div  v-if="store.state.loggedIn" class="relative m-auto my-2 w-fit mb-6">
            <button v-tippy class="border-2 border-slate-500 p-1 shadow-lg rounded-full" :class="store.state.notifications.length > 0 ? 'animate-pulse border-slate-900' : ''"><BellIcon class="h-6 w-6"/>
                <tippy target="_parent" v-if="store.state.notifications.length > 0" :extra="{theme: 'light'}" placement="right-end" :interactive="true" delay="100">
                    <Error :error="error" :index="index" v-for="error, index in store.state.notifications" :key="index" />
                </tippy>
            </button>
            <span v-if="store.state.notifications.length > 0" class="absolute -bottom-3.5 -right-1 text-xl text-blue-900 font-mono font-extrabold">{{store.state.notifications.length}}</span>
        </div>
        <div class="flex justify-center m-auto">
            <button @click="logout" class="mb-2 p-1 flex align-middle justify-center items-center border-b-2 gap-1 rounded shadow border-slate-500 hover:border-orange-300 hover:shadow-inner hover:gap-0"><LogoutIcon class="h-5 w-5 text-slate-600"/>Logout</button>
        </div>
        <LoggedInNavItemVue path="/" text="Home" name="Home" />
        <LoggedInNavItemVue path="/profile" text="Profile" name="Profile"/>
    </nav>
</template>