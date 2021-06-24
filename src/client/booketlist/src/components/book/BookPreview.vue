<template>
   <!-- Child Component of List-->
  <div
    class="card mb-3 mt-3"
    v-if="bookDetails">

    <div class="row g-0">
      <div class="col-md-4">
        <img :src="bookDetails.thumbnail" alt="Book Cover">
      </div>

      <div class="col-md-8">
        <div class="card-body ml-4">
          <v-icon class="heart-icon" color="red lighten-3">mdi-heart</v-icon>

          <h5 class="card-title" align="center">{{ bookDetails.title }}</h5>

          <v-rating
            v-if="readerRating"
            align="center"
            :value="readerRating"
            color="amber"
            dense
            readonly
            size="18">
          </v-rating>

          <div class="grey--text ms-3" align="center">
            {{ readerRating }}
          </div>
        </div>
      </div>
    </div>
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

    readerRating: {
      type: Number,
      required: false
    }
  },

  data () {
    return {
      bookDetails: null
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

        let apiInfo = response.data.items[0].volumeInfo

        this.bookDetails = {
          thumbnail: apiInfo.imageLinks.thumbnail,
          title: apiInfo.title,
          averageRating: apiInfo.averageRating
        }

      } catch (error) {
        console.error(error)
      }
    }
  },

  created () {
    this.fetchBookDetails()
  }
}
</script>

<style>
.card {
  max-width: 540px;
  min-height: 280px;
}

img {
  margin: 20px 0px 25px 15px
}

.card-body .heart-icon {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>