<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingSymbol from '@/components/LoadingSymbol.vue';
import DataTableVue from '@/components/DataTable.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import StickyAddButton from '@/components/buttons/StickyAddButton.vue';
import Popup from "@/components/Popup.vue"


const store = useStore()

const expensesForUser = ref([])
const loading = ref(false);
const showAddPopup = ref(false);
const accountsForUser = ref([]);
const expenseToAdd = ref({
    accountId: "",
    value: "",
    description: ""
})


onMounted(() => {
    getExpensesForUser();
    getAccountsForUser();
})

function getExpensesForUser() {
    loading.value = true;
    axios.get(`/expenses/user/${store.state.userData.nick}`)
    .then(response => {
        expensesForUser.value = response.data;
        expensesForUser.value.forEach(expense => {
            expense.value = parseFloat(expense.value);
            expense.value = expense.value.toFixed(2);
        });
        loading.value = false
    })
}

function deleteExpense(expenseId) {
    axios.delete(`/expense/${expenseId}`)
    .then(response => {
        store.commit('addNotification', {message: `Deleted expense with ID ${expenseId}`})
        getExpensesForUser();
    })
}

function addExpense() {
    axios.post("/expense", expenseToAdd.value)
    .then(response => {
        store.commit('addNotification', {message: `Added expense: ${response.data.expense_id}`})
        getExpensesForUser();
        addExpensePopup(false);
    })
}

function addExpensePopup(visible) {
    if (!visible) {
        expenseToAdd.value = {
            accountId: "",
            value: "",
            description: ""
        }
    }
    showAddPopup.value = visible;
}

function getAccountsForUser() {
    loading.value = true;
    axios.get(`/accounts/${store.state.userData.nick}`)
    .then(response => {
        accountsForUser.value = response.data.map(account => account.account_id);
        loading.value = false;
    })
}

</script>

<template>
    <div class="w-full h-52">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full">Expenses</h1>
        <StickyAddButton v-if="!loading" @click="addExpensePopup(true)"/>
        <Popup v-if="showAddPopup" @cancel="addExpensePopup(false)" @accept="addExpense">
            <template #title>
                <div class="flex justify-center items-center mt-1 text-2xl border-b-2 pt-2 border-blue-300 text-slate-900 font-semibold">
                    <h1>Add expense</h1>
                </div>
            </template>

            <template #body>
                <div class="flex flex-col gap-2 justify-center items-center pt-2 mt-4">
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Account</label>
                        <select v-model="expenseToAdd.accountId" maxlength="100" class="form-select rounded w-1/2 border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2">
                            <option selected disabled>Select one</option>
                            <option v-for="account in accountsForUser" :key="account" :value="account">{{account}}</option>
                        </select>
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Value</label>
                        <input v-model="expenseToAdd.value" maxlength="100" type="number" class="form-input rounded border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2 w-1/2">
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Description</label>
                        <textarea v-model="expenseToAdd.description" maxlength="100" class="form-textarea rounded w-1/2 resize-none border-slate-400 focus:border-orange-300 focus:ring-0 focus:border-2"></textarea>
                    </div>
                </div>
            </template>
        </Popup>
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto"/>
        <DataTableVue
        v-else
        :headersKeys="{'Expense ID': 'expense_id', 'Account ID': 'accountId', 'Description':'description', 'Date':'date', 'Value':'value'}"
        :data="expensesForUser"
        :noDataMessage="'There are no expenses, start by adding one!'"
        hasActions
        >

            <template #actions="actionsProps">
                <DeleteButton @delete="deleteExpense(actionsProps.rowData.expense_id)" />
            </template>
        </DataTableVue>

    </div>
</template>