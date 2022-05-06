<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {UserIcon} from "@heroicons/vue/outline";
import axios from "axios";
import { ref } from "vue";

const store = useStore();
const router = useRouter();

const loginData = ref({
    nick: "",
    password: ""
})

function login() {
    axios.post("/auth/signin", loginData.value)
    .then((response) => {
        store.commit('login', response.data);
        router.push({name: "Home"});
    })
}
</script>

<template>
    <div class="flex flex-col w-6/12 m-auto border border-slate-900 rounded shadow-2xl p-5 bg-white">
        <h2 class="m-auto text-2xl text-slate-700 border-b-4 border-slate-200 w-full text-center rounded pb-4 flex justify-center gap-2"><UserIcon class="w-5 h-5 self-center"/><span>Log into your account</span></h2>
        <div class="flex flex-col w-6/12 m-auto mt-5 text-center">
            <label for="nickname">Nickname</label>
            <input v-model="loginData.nick" maxlength="20" type="text" name="nickname" class="form-input border-0 border-b-2 border-slate-400 rounded px-5 text-center focus:ring-0 focus:border-blue-200">
        </div>
        <div class="flex flex-col w-6/12 m-auto mt-5 text-center">
            <label for="nickname">Password</label>
            <input v-model="loginData.password" maxlength="20" type="password" name="nickname" class="form-input border-0 border-b-2 border-slate-400 rounded px-5 text-center focus:ring-0 focus:border-blue-200">
        </div>
        <div class="flex flex-col w-full rounded m-auto mt-5 text-center">
            <button @click="login" type="button" class="border-2 rounded p-2 w-2/12 m-auto mt-5 shadow-lg text-slate-900 bg-blue-200 border-blue-400 hover:bg-opacity-50 hover:border-opacity-0 hover:text-slate-800 hover:shadow-inner">Login</button>
        </div>
    </div>
</template>