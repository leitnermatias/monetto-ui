import { createApp } from 'vue'
import './tailwind.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import App from './App.vue'
import store from './store'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {TippyPlugin} from "tippy.vue"

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
axios.defaults.withCredentials = true;

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (
    !store.state.loggedIn &&
    to.name !== "Login" &&
    to.name !== "Sign Up"
  ) {
    return { name: "Login" };
  }
});

app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(TippyPlugin)
app.mount('#app')
