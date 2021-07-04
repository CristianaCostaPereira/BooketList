<template>
  <div class="p-4">
    <v-row v-if="favoriteBooks.length">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="3"
        v-for="favoriteBook in favoriteBooks"
        :key="favoriteBook.book_id">

        <!-- Father Component of BookPreview -->
        <book-preview
          :reader-favorite-details="favoriteBook">
        </book-preview>
      </v-col>
    </v-row>

    <v-row v-else>
      ainda num tem  ;(
    </v-row>
  </div>
</template>

<script>
import BookPreview from './BookPreview.vue'

const axios = require('axios')

export default {
  name: 'FavoriteList',

  components: {
    BookPreview
  },

  data () {
    return {
      favoriteBooks: [], // has my google_api_id,
      readerId: null
    }
  },

  methods: {
    async fetchFavoritesBooks() {
      try {
        const response = await axios.get(`http://localhost:3000/readers/${this.readerId}/books`)

        this.favoriteBooks = response.data.data

      } catch (error) {
        console.error(error)
      }
    }
  },

  created () {
    // To get the logged reader id (dinamic in my request)
    let readerInfoString = window.localStorage.getItem('reader-info')
    let readerInfoObject = JSON.parse(readerInfoString)

    this.readerId = readerInfoObject.readerId

    this.fetchFavoritesBooks()
  }
}
</script>