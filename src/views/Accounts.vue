<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {CashIcon} from "@heroicons/vue/outline"
import {useStore} from "vuex";
import LoadingSymbol from "@/components/LoadingSymbol.vue";
import AddAccountButton from '@/components/accounts/AddAccountButton.vue';
import ActionsButton from '@/components/accounts/ActionsButton.vue';

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
        <AddAccountButton @click="addAccount" v-if="!loading" />
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
        <table v-else class="table-auto m-auto mt-4 border-4 border-opacity-20 border-slate-500 w-full shadow">
            <thead>
                <tr class="bg-slate-200 border-b-2 border-slate-500">
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
                    <td class="p-1">
                        <ActionsButton @delete="deleteAccount(account.accountId)"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>