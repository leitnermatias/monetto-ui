<script setup>
import LoggedOutNavVue from './components/navigation/LoggedOutNav.vue';
import LoggedInNavVue from './components/navigation/LoggedInNav.vue';
import { BellIcon, XCircleIcon } from '@heroicons/vue/outline';
import { useStore } from 'vuex';
import { ref } from 'vue';


const store = useStore();


</script>

<template>
  <div :class="store.state.loggedIn ? 'flex flex-row h-screen' : '' ">
    <header :class="store.state.loggedIn ? 'border-r-2 border-slate-200 shadow-lg w-2/12 bg-slate-100 bg-opacity-50' : 'bg-white shadow h-14'">
      <LoggedInNavVue v-if="store.state.loggedIn" />
      <LoggedOutNavVue v-else />
    </header>
    <main :class="store.state.loggedIn ? 'w-full h-full p-2' : 'p-2 mt-2'">
      <router-view />
    </main>
  </div>
</template>
