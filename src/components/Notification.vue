<script setup>
import { useStore } from 'vuex';

const store = useStore()

const props = defineProps({
    notification: Object,
    index: Number
})
</script>

<template>
    <div @click="store.commit('removeNotification', index)" class="relative flex flex-col justify-center w-full h-24 rounded-xl mb-2 p-2 shadow-lg border cursor-pointer border-blue-400 hover:shadow-inner hover:border-orange-400">
        <p class="text-slate-800 text-sm break-words text-center font-bold">{{notification.message}}</p>
    </div>
</template>