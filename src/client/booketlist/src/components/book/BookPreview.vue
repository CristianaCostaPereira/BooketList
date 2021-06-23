<template>
  <div class="book-preview">
    <h1>Book preview</h1>

    <img :src="getImageCover()" alt="Book Cover" style="margin-left: 15px; margin-top: 20px; margin-bottom: 25px">
  </div>
</template>

<script>
const axios = require('axios')
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

export default {
  // Child Component
  props: {
    googleApiId: {
      type: String,
      required: true
    },
  },

  data () {
    return {
      bookDetails: []
    }
  },

  methods: {
    async fetchBookDetails() {

      const API_KEY = process.env.API_KEY

      let config = {
        params: {
          key: API_KEY,
          q: this.googleApiId
        }
      }
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', config)
        console.log(response.data)

        this.bookDetails = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    getImageCover () {
      this.bookDetails = this.fetchBookDetails()
      // response.data.volumeInfo.imageLinks.smallThumbnail
    }
  },

  created () {
    this.fetchBookDetails()
  }
}
</script>