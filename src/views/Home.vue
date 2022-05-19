<script setup>
import VerticalBarChart from '@/components/chart/VerticalBarChart.vue';
import PieChart from '@/components/chart/PieChart.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { ChevronDownIcon, MinusIcon } from '@heroicons/vue/outline';

const expenseEarningChartData = ref({
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: []
})
const accountsChartData = ref({
  labels: [],
  datasets: []
})
const showCharts = ref(false);


onMounted(() => {
  getEarningsForUser();
  getExpensesForUser();
  getAccounts();
})

const store = useStore();

function getEarningsForUser() {
  axios.get(`/earnings/user/${store.state.userData.nick}`)
  .then(response => {
    let earningsDataset = {
      label: "Earnings",
      backgroundColor: "DarkGreen",
      data: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
    response.data.forEach(earning => {
      let value = parseFloat(earning.value);
      value = parseFloat(value.toFixed(2));
      const monthNumber = new Date(earning.date).getMonth();
      earningsDataset.data[monthNumber] += value;
    });
    
    expenseEarningChartData.value.datasets.push(earningsDataset);
  })
}

function getExpensesForUser() {
  axios.get(`/expenses/user/${store.state.userData.nick}`)
  .then(response => {
    let expensesDataset = {
      label: "Expenses",
      backgroundColor: "brown",
      data: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
    response.data.forEach(expense => {
      let value = parseFloat(expense.value);
      value = parseFloat(value.toFixed(2));
      const monthNumber = new Date(expense.date).getMonth();
      expensesDataset.data[monthNumber] += value;
    });
    
    expenseEarningChartData.value.datasets.push(expensesDataset);
  })
}

function sum(values) {
    let total = 0;

    values.forEach(value => {
        total += parseFloat(value)
    })

    return total.toFixed(2);

}

function getAccounts() {
  axios.get(`/accounts/${store.state.userData.nick}`)
  .then(response => {
    let accountsDataSet = {
      backgroundColor: [],
      data: []
    }
    response.data.forEach(account => {
      const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
      const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
      accountsDataSet.backgroundColor.push(randomRGB());
      accountsChartData.value.labels.push(account.account_id);
      let total = sum(account.earnings.map(e => e.value)) - sum(account.expenses.map(e => e.value));
      accountsDataSet.data.push(total < 0 ? 0 : total);
    })

    accountsChartData.value.datasets.push(accountsDataSet);

  })
}

</script>

<template>
<div class="flex flex-col gap-1 w-full">
  <h1 class="text-2xl text-center text-slate-900 mb-2 w-full border-b-4 rounded border-slate-400">Home</h1>
  <div 
  @click="showCharts = !showCharts" 
  class="flex justify-center border-b-2 rounded border-blue-300 text-xl hover:bg-orange-100 hover:border-orange-300 hover:bg-opacity-40 cursor-pointer"
  :class="showCharts ? 'border-orange-500 w-1/2 self-center border font-bold' : 'w-1/2 self-center border font-semibold'"
  >
    <h1 class="text-slate-900 flex items-center gap-4">
      <MinusIcon v-if="showCharts" class="w-5 h-5" />
      <ChevronDownIcon v-else class="w-5 h-5"/>
      Charts
    </h1>
  </div>
  <div v-if="showCharts" class="flex gap-2 p-2 border-2 rounded border-orange-200 shadow-xl">
    <div class="w-1/2 border border-slate-900 shadow-xl">
      <VerticalBarChart :chartData="expenseEarningChartData" />
    </div>
    <div class="w-1/2 border border-slate-900 shadow-xl">
      <PieChart :chartData="accountsChartData" />
    </div>
  </div>
</div>
</template>
