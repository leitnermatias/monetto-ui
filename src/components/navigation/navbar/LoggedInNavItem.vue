<script setup>

const props = defineProps({
    text: String,
    path: String,
    name: String,
})


const navItem = "m-2 w-24 h-10 flex justify-start pl-2 text-center items-center border-l-4 border-blue-200 text-slate-900 hover:justify-start hover:border-orange-400"
const activeTab = "border-orange-300 flex rounded text-black"
</script>

<template>
<div :class="$route.name === name ? 'border-slate-200 shadow-inner mb-2 rounded' : 'border-slate-100 shadow mb-1 rounded'  ">
    <router-link :class="[navItem, $route.name === name ? activeTab : '']" :to="path">{{text}}</router-link>
</div>
</template>