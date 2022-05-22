<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {CashIcon, TrashIcon, PlusCircleIcon, TrendingDownIcon, TrendingUpIcon} from "@heroicons/vue/outline"
import {useStore} from "vuex";
import LoadingSymbol from "@/components/LoadingSymbol.vue";
import AddAccountButton from '@/components/buttons/StickyAddButton.vue';
import ActionsButton from '@/components/accounts/ActionsButton.vue';
import DataTable from '@/components/DataTable.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import ActionButton from "@/components/buttons/ActionButton.vue";
import Popup from "@/components/Popup.vue";


const store = useStore();
const accounts = ref([]);
const loading = ref(false);
const valueToAdd = ref({
    value: "",
    description: ""
})
const activeAccount = ref(null);

const activePopup = ref("");

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

function popup(type, accountId) {
    activeAccount.value = accountId;
    switch (type) {
        case "addEarning":
            activePopup.value = "addEarning";
            break;
        case "addExpense":
            activePopup.value = "addExpense";
            break;
        case 'closePopup':
            activePopup.value = "";
            break;
        default:
            break;
    }
}

function addEarningForAccount(accountId) {
    axios.post("/earning", valueToAdd.value)
    .then(response => {
        store.commit('addNotification', {message: `Added earning: ${response.data.earning_id}`})
        getAccounts();
    })
}

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full"><CashIcon class="w-6 h-6 text-slate-700"/>Accounts</h1>
        <Popup v-if="activePopup === 'addEarning'" @cancel="activePopup = ''" @accept="addEarningForAccount">
            <template #title>
                <div class="flex justify-center items-center mt-1 text-2xl border-b-2 pt-2 border-blue-300 text-slate-900 font-semibold">
                    <h1>Add earning</h1>
                </div>
            </template>

            <template #body>
                <div class="flex flex-col gap-2 justify-center items-center pt-2 mt-4">
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Value</label>
                        <input v-model="valueToAdd.value" maxlength="100" type="number" class="form-input rounded border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2 w-1/2">
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Description</label>
                        <textarea v-model="valueToAdd.description" maxlength="100" class="form-textarea rounded w-1/2 resize-none border-slate-400 focus:border-orange-300 focus:ring-0 focus:border-2"></textarea>
                    </div>
                </div>
            </template>
        </Popup>
        
        
        <AddAccountButton @click="addAccount" v-if="!loading" />
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
        
        <DataTable 
        v-else
        :headersKeys="{'Account ID':'accountId', 'Total Earnings':'earnings', 'Total Expenses':'expenses'}" 
        :data="accounts" 
        hasActions
        >

            <template #actions="actionsProps">
                <ActionButton @click="addEarningForAccount">
                    <TrashIcon class="h-5 w-5"/>Delete
                </ActionButton>
                <ActionButton>
                    <TrendingUpIcon class="h-5 w-5"/>Add earning
                </ActionButton>
                <ActionButton>
                    <TrendingDownIcon class="h-5 w-5"/>Add expense
                </ActionButton>
            </template>

        </DataTable>
    </div>
</template>