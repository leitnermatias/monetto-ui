<script setup>

const props = defineProps({
    text: String,
    path: String,
    name: String,
})


const navItem = "m-2 w-24 h-10 flex justify-start pl-2 text-center items-center border-l-4 border-blue-200 text-slate-900 hover:justify-start hover:border-orange-400"
const activeTab = "m-2 w-24 h-10 flex justify-center pl-2 text-center items-center border-l-4 border-orange-400 text-slate-900"
</script>

<template>
<div :class="$route.name === name ? 'border-slate-200 shadow-inner mb-2 rounded font-bold' : 'border-slate-100 shadow mb-2 rounded'  ">
    <router-link :class="[$route.name === name ? activeTab : navItem]" :to="path">{{text}}</router-link>
</div>
</template>