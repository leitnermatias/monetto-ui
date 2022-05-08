<script setup>
import {LogoutIcon} from "@heroicons/vue/outline"
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()

function logout() {
    store.commit('logout');
    axios.post("/auth/signout")
    router.push({name: "Login"})
}

</script>

<template>
    <div class="flex justify-center m-auto">
        <button @click="logout" class="mb-2 p-1 flex align-middle justify-center items-center border-b-2 gap-1 rounded shadow border-slate-500 hover:border-orange-300 hover:shadow-inner hover:gap-0"><LogoutIcon class="h-5 w-5 text-slate-600"/>Logout</button>
    </div>
</template>