<template>
  <div class="p-4">
    <v-row>
      <v-col
        cols="12"
        sm="5"
        md="4"
        lg="3"
        v-for="favoriteBook in favoriteBooks"
        :key="favoriteBook.book_id">

        <!-- Father Component of BookPreview -->
        <book-preview
          :google-api-id="favoriteBook.google_api_id"
          :readerRating="favoriteBook.reader_rating">
        </book-preview>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BookPreview from './BookPreview.vue'

const axios = require('axios')

export default {
  name: 'List',

  components: {
    BookPreview
  },

  data () {
    return {
      favoriteBooks: [], // has my google_api_id
    }
  },

  methods: {
    async fetchFavoritesBooks() {
      let retrievedToken = window.localStorage.getItem('book-token')

      let config = {
        headers: {
          'Authorization': retrievedToken
        }
      }
      try {
        const response = await axios.get('http://localhost:3000/readers/1/books', config)

        this.favoriteBooks = response.data.data

      } catch (error) {
        console.error(error)
      }
    }
  },

  created () {
    this.fetchFavoritesBooks()
  }
}
</script>