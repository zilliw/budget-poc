import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import TheMenu from '../views/TheMenu.vue'
import Timesheet from '../views/Timesheet.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/themenu',
    name: 'TheMenu',
    component: TheMenu
  },
  {
    path: '/timesheet',
    name: 'Timesheet',
    component: Timesheet
  }
]

const router = new VueRouter({
  mode: 'history',
  routes

})

export default router
