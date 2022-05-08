<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {PlusIcon, CashIcon, TrashIcon} from "@heroicons/vue/outline"
import {useStore} from "vuex";
import LoadingSymbol from "@/components/LoadingSymbol.vue";

const store = useStore();
const accounts = ref([])
const loading = ref(false);

onMounted(() => {
    getAccounts()
})

function getAccounts() {
    loading.value = true;
    axios.get(`/accounts/${store.state.userData.nick}`)
    .then(response => {
        accounts.value = response.data;
        loading.value = false;
    })
}

function sum(earnings) {
    let totalEarnings = 0;

    earnings.forEach(earning => {
        totalEarnings += parseFloat(earning.value)
    })

    return totalEarnings.toFixed(2);

}

function deleteAccount(accountId) {
    axios.delete(`/account/${accountId}`)
    .then(response => {
        store.commit('addNotification', {message: `Deleted account with ID ${accountId}`})
        getAccounts();
    })
}

function addAccount() {
    axios.post(`/account/${store.state.userData.nick}`)
    .then(response => {
        store.commit('addNotification', {message: `Added an account for user ${store.state.userData.nick}`})
        getAccounts()
    })
}

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full"><CashIcon class="w-6 h-6 text-slate-700"/>Accounts</h1>
        <button @click="addAccount" v-if="!loading" class="flex items-center text-slate font-bold mt-2 fixed bottom-5 right-5 border-2 bg-white border-blue-200 p-2 gap-2 rounded shadow-xl hover:border-orange-300 hover:shadow-inner"><PlusIcon class="w-5 h-5"/>Add account</button>
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
        <table v-else class="table-auto m-auto mt-4 border-4 border-opacity-20 border-slate-500 w-full shadow">
            <thead>
                <tr class="bg-slate-100 border-b-2 border-slate-500">
                    <th class="border-r-4 border-slate-500 border-opacity-50">Account ID</th>
                    <th class="border-r-4 border-slate-500 border-opacity-50">Total Earnings</th>
                    <th class="border-r-4 border-slate-500 border-opacity-50">Total Expenses</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="index % 2 === 0 ? 'bg-slate-100' : 'bg-white'" class="border-b-2 border-slate-300 text-center" v-for="account, index in accounts" :key="account.accountId">
                    <td class="border-r-4 border-slate-500 border-opacity-50">{{account.accountId}}</td>
                    <td class="border-r-4 border-slate-500 border-opacity-50">{{sum(account.earnings)}}</td>
                    <td class="border-r-4 border-slate-500 border-opacity-50">{{sum(account.expenses)}}</td>
                    <td>
                        <button v-tippy class="border w-10/12 border-blue-400 bg-white rounded hover:border-orange-300">Select
                            <tippy target="_parent" :interactive="true" placement="left-end" :extra="{arrow: true, offset: [0, 5], theme: 'light-border'}">
                                <div class="flex flex-col w-28 shadow rounded">
                                    <button @click="deleteAccount(account.accountId)" class="flex items-center gap-2 justify-center p-2 border border-blue-200 hover:shadow-inner hover:border-orange-200"><TrashIcon class="w-5 h-5"/>Delete</button>
                                </div>
                            </tippy>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>