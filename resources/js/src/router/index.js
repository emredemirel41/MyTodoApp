import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.getisAuthenticated){
        next('/dashboard');
      }else{
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Register.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.getisAuthenticated){
        next('/dashboard');
      }else{
        next();
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.getisAuthenticated){
        next();
      }else{
        next('/login');
      }
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router