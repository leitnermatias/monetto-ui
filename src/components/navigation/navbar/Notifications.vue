<script setup>
import { useStore } from 'vuex';
import {BellIcon} from "@heroicons/vue/outline"
import Notification from "@/components/Notification.vue"


const store = useStore();
</script>

<template>
    <div class="relative m-auto my-2 w-fit mb-6">
        <button v-tippy class="border-2 border-slate-500 p-1 shadow-lg rounded-full" :class="store.state.notifications.length > 0 ? 'animate-pulse border-slate-900' : ''"><BellIcon class="h-6 w-6"/>
            <tippy target="_parent" :enabled="store.state.notifications.length > 0" :extra="{theme: 'light-border'}" placement="right-end" :interactive="true" delay="100" trigger="click">
                <div class="overflow-y-scroll max-h-80 p-2 w-80">
                    <Notification :notification="notification" :index="index" v-for="notification, index in store.state.notifications" :key="index" />

                </div>
            </tippy>
        </button>
        <span v-if="store.state.notifications.length > 0" class="absolute -bottom-3.5 -right-1 text-xl text-blue-900 font-mono font-extrabold">{{store.state.notifications.length}}</span>
    </div>
</template>