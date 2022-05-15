<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {CashIcon, TrashIcon} from "@heroicons/vue/outline"
import {useStore} from "vuex";
import LoadingSymbol from "@/components/LoadingSymbol.vue";
import AddAccountButton from '@/components/accounts/AddAccountButton.vue';
import ActionsButton from '@/components/accounts/ActionsButton.vue';
import DataTableVue from '@/components/DataTable.vue';

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
        accounts.value = response.data.map(account => {
            return {
                accountId: account.account_id,
                earnings: sum(account.earnings),
                expenses: sum(account.expenses)
            }
        })

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
        
        <DataTableVue 
        v-else
        :headersKeys="{'Account ID':'accountId', 'Total Earnings':'earnings', 'Total Expenses':'expenses'}" 
        :data="accounts" 
        hasActions
        >

            <template #actions="actionsProps">
                <button 
                @click="deleteAccount(actionsProps.rowData.accountId)" 
                class="flex items-center gap-2 justify-center p-2 border border-blue-200 hover:shadow-inner hover:border-orange-200">
                    <TrashIcon class="w-5 h-5"/>Delete
                </button>
            </template>

        </DataTableVue>
    </div>
</template>