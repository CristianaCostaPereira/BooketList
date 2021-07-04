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
    },

    updateReaderFavoriteDetails (state, payload) {      
      state.readerFavoriteDetails.edition_number = payload.edition_number
      state.readerFavoriteDetails.end_reading = payload.end_reading
      state.readerFavoriteDetails.purchase_date = payload.purchase_date
      state.readerFavoriteDetails.reader_rating = payload.reader_rating
      state.readerFavoriteDetails.reading_time = payload.reading_time
      state.readerFavoriteDetails.start_reading = payload.start_reading
    }
  },
  actions: {
  },
  modules: {
  }
})
