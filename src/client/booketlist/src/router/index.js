// Define all the routes I want the application to have
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (book-preview.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book-preview" */ '../components/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../components/book/List'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import('../components/book/Show'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// beforeEach method that is called before each route is processed
// This is where we can define our checking condition and restrict user access
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('book-token') == null) {
      next({
        path: '/login',
        // params: { nextUrl: to.fullPath }
      })
    } else {
      // let reader = JSON.parse(localStorage.getItem('reader'))
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('book-token') != null) {
      next({ name: 'Dashboard'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router