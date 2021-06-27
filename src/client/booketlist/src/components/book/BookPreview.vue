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
              v-if="notYetFavoriteBook"
              align="center"
              outlined
              small
              data-bs-toggle="modal"
              data-bs-target="#favoriteBookModal">

              Mark as Favorite

              <v-icon class="mark-as-favorite-icon ml-2" color="amber lighten">mdi-star-outline</v-icon>
            </v-btn>

            <v-btn
              v-else
              align="center"
              outlined
              small
              data-bs-toggle="modal"
              data-bs-target="#favoriteBookModal">

              Edit Favorite Book

              <v-icon class="heart-icon ml-2" color="amber lighten">mdi-star</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <!-- Modal for personal book details-->
    <div class="modal fade" id="favoriteBookModal" tabindex="-1" aria-labelledby="favoriteBookModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="favoriteBookModalLabel">
              
              Personal Details
              <v-icon
                class="heart-icon ml-2"
                color="amber lighten">
                
                mdi-star-face
              </v-icon>
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="starReading" class="form-label">Start reading at:</label>
              <input type="date" class="form-control" id="starReading">
            </div>

            <div class="mb-3">
              <label for="endReading" class="form-label">End reading at:</label>
              <input type="date" class="form-control" id="endReading">
            </div>

            <div class="mb-3">
              <label for="readerPersonalRating" class="form-label">My personal rating:</label>
              <input type="text" class="form-control" id="readerPersonalRating">
              <v-rating
                v-if="readerRating"
                align="center"
                :value="readerRating"
                color="amber"
                dense
                size="18">
              </v-rating>

              <div class="grey--text ms-3" align="center">
                {{ readerRating }}
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              
              Close
            </button>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="setAsFavorite()">
              
              Save changes
            </button>
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
      bookDetails: null,
      color: '#a97fa4e3',
      notYetFavoriteBook: true
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
    },

    setAsFavorite() {
      this.notYetFavoriteBook = !this.notYetFavoriteBook
    },
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

.mark-as-favorite-icon {
  position: absolute;
  right: 0px;
  top: 0px;
}

.v-card__text, .v-card__title {
  word-break: normal !important;
  text-align: center;
}
</style>