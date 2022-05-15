<script setup>
import {TrashIcon} from "@heroicons/vue/outline"

const props = defineProps({
    text: String
})
</script>

<template>
    <button 
    @click="$emit('delete')" 
    class="flex items-center gap-2 justify-center p-2 border border-blue-200 hover:shadow-inner hover:border-orange-200">
        <TrashIcon class="w-5 h-5"/>{{text || "Delete"}}
    </button>
</template>