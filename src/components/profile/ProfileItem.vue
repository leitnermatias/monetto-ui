<script setup>
import {PencilIcon, XIcon, CheckIcon} from "@heroicons/vue/solid"
import { ref } from "vue";

const editing = ref(false);

const props = defineProps({
    data: String,
    label: String,
    editable: Boolean,
    hasErrors: Boolean,
    errors: Array
})

const emit = defineEmits(["save"])

function edit() {
    editing.value = true;
}

function cancelEdit() {
    editing.value = false;
}

function saveData() {
    emit('save', {newData: props.data, name: props.label});
    editing.value = false;
}

</script>

<template>
    <div>
        <div>
            <span class="text-slate-900 pl-2">{{label}}</span>
            <div class="flex flex-row justify-between w-80 border-b-2 border-slate-300 border-l-4 rounded" :class="[editing ? 'border-orange-200' : '', hasErrors ? 'border-red-500' : '']">
                <input v-if="editable && editing" v-model="data" class="form-input h-10 border-none self-center focus:ring-0 focus:border-none">
                <p class="pr-10 pl-4 h-10 py-2" v-if="!editing">{{data}}</p>
                <PencilIcon v-if="editable && !editing" @click="edit" class="h-5 w-5 self-center mr-2 cursor-pointer rounded hover:shadow-inner"/>
                <div v-else-if="editable" class="flex flex-col gap-1 border-l-2 shadow border-orange-300 justify-center items-center" :class="[hasErrors ? 'border-red-500' : 'border-orange-300']">
                    <XIcon @click="cancelEdit" class="h-5 w-5 m-1 cursor-pointer rounded hover:shadow-inner" />
                    <CheckIcon @click="saveData" class="h-5 w-5 m-1 cursor-pointer rounded hover:shadow-inner"/>
                </div>
            </div>
        </div>
        <div>
            <p class="text-right text-sm text-red-600 font-bold" v-for="error, index in errors" :key="index">{{error.message}}</p>
        </div>
    </div>
    
    
    
</template>