import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleBookDetails: {
      bla: 'dsds',
      hi: 'usdsdsd'
    },

    readerFavoriteDetails: {}
  },
  getters: {
    googleBookDetails: state => state.googleBookDetails,
    readerFavoriteDetails: state => state.readerFavoriteDetails,
  },
  mutations: {
    // increment(state) {
    //   state.count++
    // }
  },
  actions: {
  },
  modules: {
  }
})
