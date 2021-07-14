// Define all the routes I want the application to have
import Vue from 'vue'
import VueRouter from 'vue-router'

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
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
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
        name: 'BookSearch',
        component: () => import('../components/book/BookSearch')
      },
      {
        path: '/favorite-list',
        name: 'FavoriteList',
        component: () => import('../components/book/FavoriteList')
      },
      {
        path: '/show',
        name: 'Show',
        component: () => import('../components/book/Show')
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
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('book-token') != null) {
      next({ name: 'BookSearch'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router