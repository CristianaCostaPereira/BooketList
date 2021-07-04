import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { boot } from '@/app-bootstrap'

Vue.use(VueAxios, axios, moment)

Vue.config.productionTip = false

boot().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    axios,
    render: h => h(App)
  }).$mount('#app')
})