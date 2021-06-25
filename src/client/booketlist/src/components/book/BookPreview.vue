<template>
  <!-- Child Component of List-->
  <div>
    <v-card
      :color="color"
      dark
      max-height="199"
      v-if="bookDetails">

      <div class="d-flex flex-no-wrap justify-between">
        <v-img alt="Book Cover"
          :src="bookDetails.thumbnail"
          max-width="128"
          max-height="200"
          min-width="128"
          min-height="200">
        </v-img>

        <div>
          <v-card-title
            class="text-h5"
            v-text="bookDetails.title">
          </v-card-title>

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

          <v-card-actions class="book-card-button">
            <v-btn
              align="center"
              outlined
              small>

              Mark as Favorite

              <v-icon class="heart-icon ml-2" color="red lighten-3">mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
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
      bookDetails: null,
      color: '#a97fa4e3 '
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

.book-card-button {
  justify-content: center;
}

.heart-icon {
  position: absolute;
  right: 0px;
  top: 0px;
}

.v-card__text, .v-card__title {
  word-break: normal !important;
  text-align: center;
}
</style>