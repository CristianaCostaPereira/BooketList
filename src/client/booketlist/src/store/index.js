import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    googleBookDetails: {},

    readerFavoriteDetails: {}
  },

  getters: {
    googleBookDetails: state => state.googleBookDetails,
    readerFavoriteDetails: state => state.readerFavoriteDetails,
  },

  mutations: {
    setGoogleBookDetails(state, payload) {
      state.googleBookDetails = payload
    },

    setReaderFavoriteDetails(state, payload) {
      state.readerFavoriteDetails = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
