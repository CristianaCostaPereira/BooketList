import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import { boot } from '@/app-bootstrap'
import VueSweetalert2 from 'vue-sweetalert2'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueAxios, axios, moment)
Vue.use(VueSweetalert2)
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