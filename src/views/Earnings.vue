<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {TrashIcon} from "@heroicons/vue/outline"
import { useStore } from 'vuex';
import LoadingSymbol from '@/components/LoadingSymbol.vue';
import DataTableVue from '@/components/DataTable.vue';

const store = useStore()

const earningsForUser = ref([])
const loading = ref(false);


onMounted(() => {
    getEarningsForUser();
})

function getEarningsForUser() {
    loading.value = true;
    axios.get(`/earnings/user/${store.state.userData.nick}`)
    .then(response => {
        earningsForUser.value = response.data;
        loading.value = false
    })
}

</script>

<template>
    <div class="w-full h-52">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full">Earnings</h1>
        <LoadingSymbol v-if="loading" class="w-10 h-10 mt-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto"/>
        <DataTableVue
        v-else
        :headersKeys="{'Earning ID': 'earning_id', 'Account ID': 'accountId', 'Description':'description', 'Date':'date', 'Value':'value'}"
        :data="earningsForUser"
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