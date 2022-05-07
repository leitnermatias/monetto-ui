<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

import ProfileItemVue from "@/components/profile/ProfileItem.vue";
import LoadingSymbol from "@/components/LoadingSymbol.vue"

const store = useStore();
const profileData = ref({});
const loading = ref(false);

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
      promise = axios.post("/user/update/email", {"nick": profileData.value.nick, "newEmail": fieldData.newData})
      .then(response => {
        store.commit('changeEmail', fieldData.newData);
        getProfileData();
      })
      break;
    case "Nickname":
      promise = axios.post("/user/update/username", {"nick": profileData.value.nick, "newNick": fieldData.newData})
      .then((response) => {
        store.commit('changeNickname', fieldData.newData);
        getProfileData()
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
          <ProfileItemVue @save="save" :data="profileData.nick" label="Nickname" editable />
          <ProfileItemVue @save="save" :data="profileData.email" label="Email" editable />
          <ProfileItemVue :data="profileData.role" label="Role" />
      </div>
      <LoadingSymbol v-else />
  </div>
</template>
