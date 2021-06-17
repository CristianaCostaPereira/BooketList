import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/book-preview',
    name: 'Book Preview',
    // route level code-splitting
    // this generates a separate chunk (book-preview.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book-preview" */ '../components/BookPreview.vue')
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (book-preview.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book-preview" */ '../components/List.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
