<script setup>
import { useStore } from 'vuex';

const store = useStore()

const props = defineProps({
    notification: Object,
    index: Number
})
</script>

<template>
    <div @click="store.commit('removeNotification', index)" class="relative flex flex-col justify-center w-64 h-24 rounded-xl mb-2 p-2 shadow-lg hover:shadow-inner hover:border">
        <p class="text-slate-900 text-lg break-words cursor-pointer">{{notification.message}}</p>
    </div>
</template>