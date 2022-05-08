<script setup>
import {UserAddIcon} from "@heroicons/vue/outline"
import SignUpFieldVue from "@/components/signup/SignUpField.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const signUpData = ref({
    nick: "",
    email: "",
    password: ""
})

const router = useRouter();

const errors = ref([])

function signUp() {
    errors.value = [];
    axios.post("/auth/signup", signUpData.value)
    .then(response => {
        router.push({ name: "Login" })
    })
    .catch(response => {
        errors.value.push(response.response.data)
    })
}

</script>

<template>
    <div class="flex flex-col w-6/12 m-auto border border-slate-900 rounded shadow-2xl p-5 bg-white">
        <h2 class="m-auto text-2xl text-slate-700 border-b-4 border-slate-200 w-full text-center rounded pb-4 flex justify-center gap-2"><UserAddIcon class="w-5 h-5 self-center"/>Create an account</h2>
        <p class="text-red-600 font-bold mt-2 m-auto" v-for="error, index in errors" :key="index">{{error.message}}</p>
        <SignUpFieldVue label="Nickname" type="text" v-model="signUpData.nick" />
        <SignUpFieldVue label="Email" type="email" v-model="signUpData.email" />
        <SignUpFieldVue label="Password" type="password" v-model="signUpData.password" />
        <div class="flex flex-col w-full rounded m-auto mt-5 text-center">
            <button @click="signUp" type="button" class="border-2 rounded p-2 w-3/12 m-auto mt-5 shadow-lg text-slate-900 bg-blue-200 border-blue-400 hover:bg-opacity-50 hover:border-opacity-0 hover:text-slate-800 hover:shadow-inner">Create Account</button>
        </div>
    </div>
</template>