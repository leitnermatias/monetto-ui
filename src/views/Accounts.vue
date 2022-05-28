<script setup>
import { onMounted, ref } from 'vue';
import {CashIcon, TrashIcon, PencilIcon, TrendingDownIcon, TrendingUpIcon} from "@heroicons/vue/outline"
import {useStore} from "vuex";
import LoadingSymbol from "@/components/LoadingSymbol.vue";
import AddAccountButton from '@/components/buttons/StickyAddButton.vue';
import DataTable from '@/components/DataTable.vue';
import ActionButton from "@/components/buttons/ActionButton.vue";
import Popup from "@/components/Popup.vue";
import * as AccountService from "@/service/account";
import * as EarningService from "@/service/earning";
import * as ExpenseService from "@/service/expense";


const store = useStore();
const accounts = ref([]);
const loading = ref(false);
const activeAccount = ref(null);
const valueToAdd = ref({
    value: "",
    description: "",
})
const accountToAddEdit = ref({
    name: "",
    description: ""
})

const activePopup = ref("");

onMounted(() => {
    getAccounts()
})

function sum(earnings) {
    let totalEarnings = 0;

    earnings.forEach(earning => {
        totalEarnings += parseFloat(earning.value)
    })

    return totalEarnings.toFixed(2);

}

function popup(type, account) {
    if (type === 'closePopup') {
        activePopup.value = '';
        activeAccount.value = {};
        valueToAdd.value.description = "";
        valueToAdd.value.value = "";
        accountToAddEdit.value.name = "";
        accountToAddEdit.value.description = "";
    } else {
        activeAccount.value = account;
        accountToAddEdit.value.name = account.name;
        accountToAddEdit.value.description = account.description;
        activePopup.value = type;
    }
}

function getAccounts() {
    loading.value = true;
    AccountService.getAccountsForUser(store.state.userData.nick)
    .then(response => {
        accounts.value = response.data.map(account => {
            return {
                accountId: account.account_id,
                earnings: sum(account.earnings),
                expenses: sum(account.expenses),
                name: account.name,
                description: account.description
            }
        })

        loading.value = false;
    })
}

function deleteAcc(accountId) {
    AccountService.deleteAccount(accountId)
    .then(() => {
        store.commit('addNotification', {message: `Deleted account with ID ${accountId}`})
        getAccounts();
    })
}

function addAccount() {
    AccountService.addAccount(store.state.userData.nick, accountToAddEdit.value.name, accountToAddEdit.value.description)
    .then(response => {
        store.commit('addNotification', {message: `Added an account for user ${store.state.userData.nick}`})
        getAccounts()
        popup('closePopup');
    })
}

function editAccount() {
    const name = accountToAddEdit.value.name
    const description = accountToAddEdit.value.description
    AccountService.editAccount(activeAccount.value.accountId, name, description)
    .then(response => {
        store.commit("addNotification", {message: `Edited account with ID: ${activeAccount.value.accountId}`});
        getAccounts();
        popup('closePopup');
    })
}

function addEarningForAccount() {
    EarningService.addEarning(activeAccount.value.accountId, valueToAdd.value.value, valueToAdd.value.description)
    .then(response => {
        store.commit('addNotification', {message: `Added earning: ${response.data.earning_id}`})
        getAccounts();
        popup('closePopup');
    })
}

function addExpenseForAccount() {
    ExpenseService.addExpense(activeAccount.value.accountId, valueToAdd.value.value, valueToAdd.value.description)
    .then(response => {
        store.commit('addNotification', {message: `Added expense: ${response.data.earning_id}`})
        getAccounts();
        popup('closePopup');
    })
}

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full"><CashIcon class="w-6 h-6 text-slate-700"/>Accounts</h1>
        <Popup v-if="activePopup === 'addEarning'" @cancel="popup('closePopup')" @accept="addEarningForAccount">
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
        <Popup v-if="activePopup === 'addExpense'" @cancel="popup('closePopup')" @accept="addExpenseForAccount">
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
        <Popup v-if="activePopup === 'addAccount'" @cancel="popup('closePopup')" @accept="addAccount">
            <template #title>
                <div class="flex justify-center items-center mt-1 text-2xl border-b-2 pt-2 border-blue-300 text-slate-900 font-semibold">
                    <h1>Add account</h1>
                </div>
            </template>

            <template #body>
                <div class="flex flex-col gap-2 justify-center items-center pt-2 mt-4">
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Name</label>
                        <input v-model="accountToAddEdit.name" maxlength="100" type="text" class="form-input rounded border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2 w-1/2">
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Description</label>
                        <textarea v-model="accountToAddEdit.description" maxlength="100" class="form-textarea rounded w-1/2 resize-none border-slate-400 focus:border-orange-300 focus:ring-0 focus:border-2"></textarea>
                    </div>
                </div>
            </template>
        </Popup>
        <Popup v-if="activePopup === 'editAccount'" @cancel="popup('closePopup')" @accept="editAccount">
            <template #title>
                <div class="flex justify-center items-center mt-1 text-2xl border-b-2 pt-2 border-blue-300 text-slate-900 font-semibold">
                    <h1>Edit account</h1>
                </div>
            </template>

            <template #body>
                <div class="flex flex-col gap-2 justify-center items-center pt-2 mt-4">
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Name</label>
                        <input v-model="accountToAddEdit.name" maxlength="100" type="text" class="form-input rounded border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2 w-1/2">
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Description</label>
                        <textarea v-model="accountToAddEdit.description" maxlength="100" class="form-textarea rounded w-1/2 resize-none border-slate-400 focus:border-orange-300 focus:ring-0 focus:border-2"></textarea>
                    </div>
                </div>
            </template>
        </Popup>
        
        <AddAccountButton @click="popup('addAccount', null)" v-if="!loading" />
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
        
        <DataTable 
        v-else
        :headersKeys="{'Account ID':'accountId', 'Name':'name', 'Description':'description', 'Total Earnings':'earnings', 'Total Expenses':'expenses'}" 
        :data="accounts" 
        hasActions
        >
            <template #actions="actionsProps">
                <ActionButton @click="popup('editAccount', actionsProps.rowData)">
                    <PencilIcon class="h-5 w-5"/>Edit
                </ActionButton>
                <ActionButton @click="deleteAcc(actionsProps.rowData.accountId)">
                    <TrashIcon class="h-5 w-5"/>Delete
                </ActionButton>
                <ActionButton @click="popup('addEarning', actionsProps.rowData)">
                    <TrendingUpIcon class="h-5 w-5"/>Add earning
                </ActionButton>
                <ActionButton @click="popup('addExpense', actionsProps.rowData)">
                    <TrendingDownIcon class="h-5 w-5"/>Add expense
                </ActionButton>
            </template>

        </DataTable>
    </div>
</template>