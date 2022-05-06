<script setup>

const props = defineProps({
    text: String,
    path: String,
    name: String,
})


const navItem = "w-24 h-10 flex justify-center text-center border-t-2 border-blue-200 text-slate-800 hover:border-t-4 hover:border-blue-300"
const activeTab = "w-24 h-10 flex justify-center text-center border-t-4 border-orange-300 text-slate-800 hover:border-t-4 hover:border-orange-300"
</script>

<template>
    <router-link :class="[$route.name === name ? activeTab : navItem]" :to="path">{{text}}</router-link>
</template>