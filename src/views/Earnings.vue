<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingSymbol from '@/components/LoadingSymbol.vue';

const store = useStore()

const earningsForUser = ref([])


onMounted(() => {
    getEarningsForUser();
})

function getEarningsForUser() {
    axios.get(`/earnings/user/${store.state.userData.nick}`)
    .then(response => {
        earningsForUser.value = response.data;
    })
}

</script>

<template>
    <div class="w-full h-52">
        <h1 class="flex items-center justify-center gap-2 text-center text-2xl text-slate-900 border-b-4 rounded border-slate-300 p-2 w-full">Earnings</h1>
        <table class="table-auto w-full m-auto border-4 border-slate-400 mt-4">
            <thead>
                <tr class="border-b-4 border-slate-400 text-center bg-slate-100 bg-opacity-50">
                    <td class="border-r-2 border-slate-300">Earning ID</td>
                    <td class="border-r-2 border-slate-300">Account ID</td>
                    <td class="border-r-2 border-slate-300">Description</td>
                    <td class="border-r-2 border-slate-300">Date</td>
                    <td>Value</td>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center border-b" :class="index % 2 === 0 ? 'bg-slate-200' : 'bg-white'" v-for="earning, index in earningsForUser" :key="earning.earning_id">
                    <td class="border-r-2 border-slate-300">{{earning.earning_id}}</td>
                    <td class="border-r-2 border-slate-300">{{earning.accountId}}</td>
                    <td class="border-r-2 border-slate-300">{{earning.description}}</td>
                    <td class="border-r-2 border-slate-300">{{earning.date}}</td>
                    <td>{{earning.value}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>