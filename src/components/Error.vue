<script setup>
import { useStore } from 'vuex';

const store = useStore()

const props = defineProps({
    error: Object,
    index: Number
})
</script>

<template>
    <div class="relative flex flex-col justify-center w-64 h-24 rounded-xl mb-2 p-2 shadow-lg overflow-y-scroll hover:shadow-inner hover:border">
        <p @click="store.commit('removeNotification', index)" class="text-slate-900 text-lg break-words">{{error.message}}</p>
    </div>
</template>