<script setup>


const emit = defineEmits(["update:modelValue"])

const props = defineProps({
    label: String,
    type: String,
    modelValue: String,
})

function updateValue(value) {
    emit("update:modelValue", value)
}

</script>

<template>
    <div class="flex flex-col w-6/12 m-auto mt-5 text-center">
        <label for="nickname">{{label}}</label>
        <input maxlength="20" :value="modelValue" @input="updateValue($event.target.value)" :type="type" name="nickname" class="form-input border-0 border-b-2 border-slate-400 rounded px-5 text-center focus:ring-0 focus:border-blue-200">
    </div>
</template>