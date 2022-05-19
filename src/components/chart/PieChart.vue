<script setup>
import {Pie} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
    chartData: Object,
    height: String,
    width: String
})
</script>

<template>
    <Pie :chart-data="chartData" :styles="{position: 'relative', height: height, width: width}"/>
</template>