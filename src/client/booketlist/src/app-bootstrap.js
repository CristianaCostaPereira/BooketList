// This file validates the provided token
// index.js validation
import Vue from 'vue'
import router from './router'

let bearerInterceptor = {
  process (request) {
    // request interceptor
    let retrievedToken = window.localStorage.getItem('book-token')

    request.headers.common['Authorization'] = retrievedToken // antes de todos os pedidos sairem, vai ao localStorage buscar o token

    return request
  },

  exception (error) {
    return Promise.reject(error)
  }
}

let handleErrorsInterceptor = {
  process (response) {
    return response
  },

  exception (error) {
    window.localStorage.removeItem('book-token')
    window.localStorage.removeItem('reader-info')

    router.push('/login')

    return Promise.reject(error)
  }
}

export async function boot () {
  Vue.axios.interceptors.request.use(bearerInterceptor.process, bearerInterceptor.exception) // correm antes do pedido ir para o BE

  Vue.axios.interceptors.response.use(handleErrorsInterceptor.process, handleErrorsInterceptor.exception) // corre depois do servido responder, mas antes do await
}