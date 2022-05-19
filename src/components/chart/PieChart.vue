<script setup>
import {Pie} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
    chartData: Object
})
</script>

<template>
    <Pie :chart-data="chartData"/>
</template>