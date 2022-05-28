<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingSymbol from '@/components/LoadingSymbol.vue';
import DataTableVue from '@/components/DataTable.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import StickyAddButton from '@/components/buttons/StickyAddButton.vue';
import Popup from "@/components/Popup.vue"
import * as EarningService from "@/service/earning";
import * as AccountService from "@/service/account";


const store = useStore()

const earningsForUser = ref([])
const loading = ref(false);
const showAddPopup = ref(false);
const accountsForUser = ref([]);
const earningToAdd = ref({
    accountId: "",
    value: "",
    description: ""
})


onMounted(() => {
    getEarningsForUser();
    getAccountsForUser();
})

function getEarningsForUser() {
    loading.value = true;
    EarningService.getEarningsForUser(store.state.userData.nick)
    .then(response => {
        earningsForUser.value = response.data;
        earningsForUser.value.forEach(earning => {
            earning.value = parseFloat(earning.value);
            earning.value = earning.value.toFixed(2);
        });
        loading.value = false
    })
}

function deleteEarning(earningId) {
    EarningService.deleteEarning(earningId)
    .then(response => {
        store.commit('addNotification', {message: `Deleted earning with ID ${earningId}`})
        getEarningsForUser();
    })
}

function addEarning() {
    EarningService.addEarning(earningToAdd.value.accountId, earningToAdd.value.value, earningToAdd.value.description)
    .then(response => {
        store.commit('addNotification', {message: `Added earning: ${response.data.earning_id}`})
        getEarningsForUser();
        addEarningPopup(false);
    })
}

function addEarningPopup(visible) {
    if (!visible) {
        earningToAdd.value = {
            accountId: "",
            value: "",
            description: ""
        }
    }
    showAddPopup.value = visible;
}

function getAccountsForUser() {
    loading.value = true;
    AccountService.getAccountsForUser(store.state.userData.nick)
    .then(response => {
        accountsForUser.value = response.data.map(account => account.account_id);
        loading.value = false;
    })
}

</script>

<template>
    <div class="w-full h-52">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full">Earnings</h1>
        <StickyAddButton v-if="!loading" @click="addEarningPopup(true)"/>
        <Popup v-if="showAddPopup" @cancel="addEarningPopup(false)" @accept="addEarning">
            <template #title>
                <div class="flex justify-center items-center mt-1 text-2xl border-b-2 pt-2 border-blue-300 text-slate-900 font-semibold">
                    <h1>Add earning</h1>
                </div>
            </template>

            <template #body>
                <div class="flex flex-col gap-2 justify-center items-center pt-2 mt-4">
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Account</label>
                        <select v-model="earningToAdd.accountId" maxlength="100" class="form-select rounded w-1/2 border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2">
                            <option selected disabled>Select one</option>
                            <option v-for="account in accountsForUser" :key="account" :value="account">{{account}}</option>
                        </select>
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Value</label>
                        <input v-model="earningToAdd.value" maxlength="100" type="number" class="form-input rounded border-slate-400 focus:ring-0 focus:border-orange-300 focus:border-2 w-1/2">
                    </div>
                    <div class="flex flex-col w-full items-center">
                        <label class="self-center font-semibold text-slate-900">Description</label>
                        <textarea v-model="earningToAdd.description" maxlength="100" class="form-textarea rounded w-1/2 resize-none border-slate-400 focus:border-orange-300 focus:ring-0 focus:border-2"></textarea>
                    </div>
                </div>
            </template>
        </Popup>
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto"/>
        <DataTableVue
        v-else
        :headersKeys="{'Earning ID': 'earning_id', 'Account ID': 'accountId', 'Description':'description', 'Date':'date', 'Value':'value'}"
        :data="earningsForUser"
        noDataMessage="There are no earnings, start by adding one!"
        hasActions
        >

            <template #actions="actionsProps">
                <DeleteButton @delete="deleteEarning(actionsProps.rowData.earning_id)" />
            </template>
        </DataTableVue>

    </div>
</template>