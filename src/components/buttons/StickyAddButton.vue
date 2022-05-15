<script setup>
import {PlusIcon} from "@heroicons/vue/outline"
import Popup from "../Popup.vue";

const props = defineProps({
    text: String
})

</script>

<template>
    <button 
    class="flex items-center text-slate font-bold mt-2 fixed bottom-5 right-5 border-2 bg-white border-blue-200 p-2 gap-2 rounded shadow-xl hover:border-orange-300 hover:shadow-inner"
    data-modal-toggle="addPopup"
    >
        <PlusIcon class="w-5 h-5"/>{{text}}
    </button>
</template>