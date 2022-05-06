import Home from './views/Home.vue'
import Login from "./views/Login.vue"
import SignUp from "./views/SignUp.vue"
import Profile from "./views/Profile.vue"
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { name: "Home", path: '/', component: Home, meta: { title: 'Home' } },
  { name: "Login", path: '/login', component: Login, meta: { title: 'Login' } },
  { name: "Sign Up", path: '/signup', component: SignUp, meta: { title: 'Sign Up' } },
  { name: "Profile", path: '/profile', component: Profile, meta: { title: 'Profile' } },
  { path: '/:path(.*)', component: NotFound },
]
