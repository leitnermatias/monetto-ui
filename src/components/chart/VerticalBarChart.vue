<script setup>
import {Bar} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    chartData: Object,
    height: String,
    width: String
})
</script>

<template>
    <Bar :chart-data="chartData" :styles="{position: 'relative', height: height, width: width}"/>
</template>