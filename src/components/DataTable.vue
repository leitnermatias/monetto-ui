<script setup>
import {TrashIcon} from "@heroicons/vue/outline"

const props = defineProps({
    headersKeys: Object,
    data: Array,
    hasActions: Boolean,
    noDataMessage: String
})

</script>

<template>
    <h1 v-if="data.length === 0" class="text-xl text-slate-900 font-semibold m-auto text-center">{{noDataMessage}}</h1>
    <table v-else class="table-auto m-auto mt-4 border-4 border-slate-500 border-opacity-50 w-full shadow-lg">
        <thead>
            <tr class="bg-slate-200 bg-opacity-25 border-b-2 border-slate-400">
                <th 
                v-for="header, index in Object.keys(headersKeys)" 
                :key="index" 
                :class="index !== Object.keys(headersKeys).length - 1 ? 'border-r-2 border-slate-500 border-opacity-50' : ''"
                >
                {{header}}
                </th>
                <th v-if="hasActions" class="border-l-2 border-slate-500 border-opacity-50">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr 
            v-for="row, index in data" 
            :key="index" 
            :class="index % 2 === 0 ? 'bg-slate-100 bg-opacity-75' : 'bg-white'" 
            class="border-b-2 border-slate-300 text-center hover:bg-slate-300 hover:bg-opacity-50"
            >
                <td 
                v-for="key, index in Object.values(headersKeys)" 
                :key="index" 
                :class="index !== Object.values(headersKeys).length - 1 ? 'border-r-2 border-slate-500 border-opacity-50' : ''"
                >
                {{row[key]}}
                </td>
                <td v-if="hasActions" class="border-l-2 border-slate-500 border-opacity-50">
                    <button v-tippy class="border w-10/12 border-blue-400 bg-white rounded hover:border-orange-300">Select
                        <tippy :enabled="!!$slots.actions" target="_parent" :interactive="true" placement="left-end" :extra="{arrow: true, offset: [0, 5], theme: 'light-border'}">
                            <div class="flex flex-col w-28 shadow rounded">
                                <slot name="actions" :rowData="row"></slot>
                            </div>
                        </tippy>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>