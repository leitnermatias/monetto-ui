const Home = () => import('./views/Home.vue')
const Login = () => import('./views/Login.vue')
const SignUp = () => import('./views/SignUp.vue')
const Profile = () => import('./views/Profile.vue')
const Accounts = () => import('./views/Accounts.vue')
const Earnings = () => import('./views/Earnings.vue')
const Expenses = () => import('./views/Expenses.vue')
const NotFound = () => import('./views/NotFound.vue')

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { name: "Home", path: '/', component: Home, meta: { title: 'Home' } },
  { name: "Login", path: '/login', component: Login, meta: { title: 'Login' } },
  { name: "Sign Up", path: '/signup', component: SignUp, meta: { title: 'Sign Up' } },
  { name: "Profile", path: '/profile', component: Profile, meta: { title: 'Profile' } },
  { name: "Accounts", path: '/accounts', component: Accounts, meta: { title: 'Accounts' } },
  { name: "Earnings", path: '/earnings', component: Earnings, meta: { title: 'Earnings' } },
  { name: "Expenses", path: '/expenses', component: Expenses, meta: { title: 'Expenses' } },
  { path: '/:path(.*)', component: NotFound },
]
