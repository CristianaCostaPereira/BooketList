// Define all the routes I want the application to have
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    component: () => import('../components/AppLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../components/book/List')
      },
      {
        path: '/show',
        name: 'Show',
        component: () => import('../components/book/Show')
      },
      {
        path: '/search',
        name: 'BookSearch',
        component: () => import('../components/book/BookSearch')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// beforeEach method that is called before each route is processed
// This is where we can define our checking condition and restrict user access
/* some() method checks if any of the elements in an array pass a test (provided as a function).
The some() method executes the function once for each element present in the array:
If it finds an array element where the function returns a true value, some() returns true (and does not check the remaining values) */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('book-token') == null) {
      next({
        path: '/login',
        // params: { nextUrl: to.fullPath }
      })
    } else {
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