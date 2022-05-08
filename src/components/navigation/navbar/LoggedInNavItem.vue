<script setup>
import { ref } from 'vue';
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/vue/outline"
import { useRoute } from 'vue-router';


const props = defineProps({
    text: String,
    path: String,
    name: String,
    children: Array
})

const route = useRoute()

const showChilds = ref(false);

function triggerShowChilds() {
    if (!isActiveChildOrSelf()) {
        return
    }

    showChilds.value = !showChilds.value;

}

function isActive(name) {
    if (route.name === name) {
        return true;
    }

    return false;

}

function isActiveChildOrSelf() {
    if (route.name === props.name) {
        return true;
    }  

    let isActiveChild = false;

    props.children.forEach(child => {
        if (child.name === route.name) {
            isActiveChild = true;
        }
    })

    return isActiveChild;

}

function isActiveChild() {
    let isActiveChild = false;

    props.children.forEach(child => {
        if (child.name === route.name) {
            isActiveChild = true;
        }
    })

    return isActiveChild;
}


</script>

<template>
<div :class="['pl-2', isActiveChildOrSelf() ? 'bg-orange-100 rounded-xl bg-opacity-70 shadow' : 'gap-1']">
    <div @click="triggerShowChilds" :class="['flex items-center', $route.name === name ? 'gap-2 font-bold text-slate-900' : 'gap-1 text-slate-800']" >
        <ChevronDownIcon v-if="showChilds && children.length > 0" class="w-5 h-5"/>
        <ChevronRightIcon v-else-if="!showChilds && children.length > 0" class="w-5 h-5"/>
        <router-link :to="path">
        {{text}}
        </router-link>
    </div>
    <div v-if="showChilds && isActiveChildOrSelf()" class="flex flex-col">
        <router-link 
        v-for="child, index in children" :key="index" :class="['ml-2 pl-2 border-l-4 rounded',isActive(child.name) ? 'border-orange-400 text-slate-900 font-bold' : ' border-blue-400 text-slate-900']" 
        :to="child.path">
        {{child.text}}
        </router-link>
    </div>
</div>
</template>