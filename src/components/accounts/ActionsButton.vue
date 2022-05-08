<script setup>
import {TrashIcon} from "@heroicons/vue/outline"

const emit = defineEmits(["delete"])

function deleteAccount() {
    emit('delete')
}

</script>

<template>
    <button v-tippy class="border w-10/12 border-blue-400 bg-white rounded hover:border-orange-300">Select
        <tippy target="_parent" :interactive="true" placement="left-end" :extra="{arrow: true, offset: [0, 5], theme: 'light-border'}">
            <div class="flex flex-col w-28 shadow rounded">
                <button @click="deleteAccount" class="flex items-center gap-2 justify-center p-2 border border-blue-200 hover:shadow-inner hover:border-orange-200"><TrashIcon class="w-5 h-5"/>Delete</button>
            </div>
        </tippy>
    </button>
</template>