import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register.vue'

import Master from '../views/layouts/Master.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import List from '../views/task/List.vue'
import CreateTask from '../views/task/Create.vue'
import AssignUser from '../views/task/Assign.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },

  {
    path: '/master',
    name: 'master',
    component: Master,
    redirect: '/dashboard',
    meta: {requiresAuth: true},
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {requiresAuth: true},
      },
      {
        path: '/tasks',
        name: 'task-list',
        component: List,
        meta: {requiresAuth: true},
      },
      {
        path: '/tasks/create',
        name: 'task-create',
        component: CreateTask,
        meta: {requiresAuth: true},
      },
      {
        path: '/tasks/assign-user/:id',
        name: 'assign-user',
        component: AssignUser,
        meta: {requiresAuth: true},
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/getAccessToken']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
