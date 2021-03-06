<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

import ProfileItemVue from "@/components/profile/ProfileItem.vue";
import LoadingSymbol from "@/components/LoadingSymbol.vue"

const store = useStore();
const profileData = ref({});
const loading = ref(false);
const errors = ref({
  email: [],
  nick: [],
  password: []
});

onMounted(() => {
  getProfileData();
});


function getProfileData() {
  loading.value = true;
  axios.get(`/user/profile/${store.state.userData.nick}`).then((response) => {
    profileData.value = response.data;
    loading.value = false
  });
}

function save(fieldData, other) {
  loading.value = true;
  let promise;
  switch (fieldData.name) {
    case "Email":
      errors.value.email = []
      promise = axios.post("/user/update/email", {"nick": profileData.value.nick, "newEmail": fieldData.newData})
      .then(response => {
        store.commit('addNotification', {message: `Changed email from ${profileData.value.email} to ${fieldData.newData}`});
        store.commit('changeEmail', fieldData.newData);
        getProfileData();
      })
      .catch(response => {
        errors.value.email.push(response.response.data)
      })
      break;
    case "Nickname":
      errors.value.nick = []
      promise = axios.post("/user/update/username", {"nick": profileData.value.nick, "newNick": fieldData.newData})
      .then((response) => {
        store.commit('addNotification', {message: `Changed nickname from ${profileData.value.nick} to ${fieldData.newData}`});
        store.commit('changeNickname', fieldData.newData);
        getProfileData()
      })
      .catch(response => {
        errors.value.nick.push(response.response.data)
      })
      break;
  }
  loading.value = false;
  
}

</script>

<template>
  <div class="border border-slate-900 rounded shadow-xl w-6/12 m-auto flex flex-col gap-2 p-4 items-center center">
      <h1 class="text-xl text-slate-900 w-full border-b-4 border-slate-300 rounded text-center pb-4">{{profileData.nick}}'s Profile</h1>
      <div v-if="!loading" class="flex flex-col gap-4 mt-4">
          <ProfileItemVue @save="save" :data="profileData.nick" label="Nickname" :hasErrors="errors.nick.length > 0" :errors="errors.nick" editable />
          <ProfileItemVue @save="save" :data="profileData.email" label="Email" :hasErrors="errors.email.length > 0" :errors="errors.email" editable />
          <ProfileItemVue :data="profileData.role" label="Role" />
      </div>
      <LoadingSymbol  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" v-else />
  </div>
</template>
