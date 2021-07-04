<template>
  <div class="container mt-12">
    <div class="card mb-3" style="max-width: 1800px;">
      <div class="d-flex">
        <div class="">

          <v-img
            min-width="300"
            min-height="500"
            alt="Book Cover"
            :src="buildImageSource">
          </v-img>
        </div>

        <div v-if="formattedBook">
          <div class="card-content col-xs-12 col-lg-8">

            <h2 class="card-title">{{ formattedBook.title }}</h2>

            <h3 class="card-title mt-5 mb-5">{{ formattedBook.subtitle }}</h3>

            <div class="card-text"
              v-if="formattedBook.authors">

              <label>Authors: </label>
                {{ formattedBook.authors }}
            </div>

            <div class="card-text"
              v-if="formattedBook.publishedDate">
              <label>Publish Date: </label>
              {{ formattedBook.publishedDate }}
            </div>

            <div class="card-text"
              v-if="formattedBook.publisher">
              <label>Publisher: </label>
              {{ formattedBook.publisher }}
            </div>

            <div class="card-text"
              v-if="formattedBook.pageCount">
              <label>Number of Pages: </label>
              {{ formattedBook.pageCount }}
            </div>

            <div class="card-text"
              v-if="formattedBook.categories">
              <label>Categories: </label>
              {{ formattedBook.categories }}
            </div>

            <div
              v-if="formattedBook.averageRating"
              class="card-text">

              <label>Average Rating: </label>
              {{ formattedBook.averageRating }}

              <label v-if="formattedBook.ratingsCount">
                ({{ formattedBook.ratingsCount }})
              </label>

            </div>

            <v-rating
                align="center"
                :value="formattedBook.averageRating"
                color="amber"
                readonly
                size="16">
              </v-rating>

            <div class="card-text"
              v-if="formattedBook.price">

              <label>Price: </label>
              {{ formattedBook.price }}
            </div>

            <h5 class="description card-text">
              {{ formattedBook.description }}
            </h5>
          </div>
        </div>

        <v-card
          v-if="readerFavoriteDetails"
          class="mx-auto"
          color="purple darken-3"
          dark
          max-width="400"

        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-star-face
            </v-icon>
            <span class="text-h6 font-weight-light">My Story</span>

            <v-spacer></v-spacer>

            <v-btn icon
              @click="openEditModal()">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>

          <div class="p-3">
            <v-card-text class="text-h5 font-weight-bold">
              “A room without books is like a body without a soul.”
            </v-card-text>

            <v-rating
              align="center"
              :value="formattedReaderDetails.readerRating"
              color="amber"
              readonly
              size="48">
            </v-rating>

            <v-card-text class="text-h6 font-weight-bold">
              <div class="reader-details-entry">Added on: {{ formattedReaderDetails.createdAt }}</div>
              <div class="reader-details-entry">Start on: {{ formattedReaderDetails.start }}</div>
              <div class="reader-details-entry">End on: {{ formattedReaderDetails.end }}</div>
              <div class="reader-details-entry">Reading Time: {{ formattedReaderDetails.readingTime }}</div>

            </v-card-text>
          </div>
        </v-card>
      </div>
    </div>

    <!-- Modal for personal book details-->
    <v-dialog
        v-model="isModalOpen"
        width="500px">

        <v-card>
          <v-card-title>
            Edit Favorite
          </v-card-title>

          <v-card-text class="p-4">
            <div class="mb-5">
                <label
                  for="startReading">

                  Start reading at:
                </label>

                <input
                  class="form-control"
                  type="date"
                  id="startReading"
                  v-model="modalInputsData.startReading">
              </div>

              <div class="mb-5">
                <label
                  for="endReading">

                  End reading at:
                </label>

                <input
                  class="form-control"
                  type="date"
                  id="endReading"
                  v-model="modalInputsData.endReading">
              </div>

              <div class="mb-5">
                <label>

                  My personal rating:
                </label>

                <v-rating
                  align="center"
                  v-model="modalInputsData.personalRating"
                  color="amber"
                  size="30">
                </v-rating>

              </div>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
const axios = require('axios')

import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Show',

  data () {
    return {
      isModalOpen: false,

      modalInputsData: {
        startReading: null,
        endReading: null,
        personalRating: null,
      }
    }
  },

  computed: {
    ...mapGetters(['googleBookDetails', 'readerFavoriteDetails']),

    buildImageSource () {
      if (
        this.googleBookDetails.volumeInfo &&
        this.googleBookDetails.volumeInfo.imageLinks &&
        this.googleBookDetails.volumeInfo.imageLinks.thumbnail) {

        return this.googleBookDetails.volumeInfo.imageLinks.thumbnail
      }
      return '@/assets/bookNotFound.jpg'
    },

    formattedBook () {
      if (!Object.entries(this.googleBookDetails).length) {
        return null
      }

      let book = {}

      book.title = this.googleBookDetails.volumeInfo.title
      book.subtitle = this.googleBookDetails.volumeInfo.subtitle

      let authors = ''
      let authorsArray = this.googleBookDetails.volumeInfo.authors

      if (authorsArray) {
        authorsArray.forEach(author => {
          authors += author + ', '
        })
        // to remove last separator characters from the string
        authors = authors.slice(0, authors.length - 2)

      }
      book.authors = authors

      if (this.googleBookDetails.volumeInfo.publishedDate) {
        book.publishedDate = this.googleBookDetails.volumeInfo.publishedDate
      }

      if (this.googleBookDetails.volumeInfo.publisher) {
        book.publishedDate = this.googleBookDetails.volumeInfo.publisher
      }

      if (this.googleBookDetails.volumeInfo.pageCount) {
        book.pageCount = this.googleBookDetails.volumeInfo.pageCount
      }


      let categories = ''
      let categoriesArray = this.googleBookDetails.volumeInfo.categories

      if (categoriesArray) {
        categoriesArray.forEach(category => {
          categories += category + ', '
        })
        // to remove last separator characters from the string
        categories = categories.slice(0, categories.length - 2)

      }
      book.categories = categories

      if (this.googleBookDetails.volumeInfo.averageRating) {
        book.averageRating = parseInt(this.googleBookDetails.volumeInfo.averageRating)
      }

      if (this.googleBookDetails.volumeInfo.ratingsCount) {
        book.ratingsCount = this.googleBookDetails.volumeInfo.ratingsCount
      }

      if (this.googleBookDetails.saleInfo &&
        this.googleBookDetails.saleInfo.listPrice &&
        this.googleBookDetails.saleInfo.listPrice.amount) {

        book.price = this.googleBookDetails.saleInfo.listPrice.amount

        if (this.googleBookDetails.saleInfo.listPrice.currencyCode === 'EUR'){
          book.price += '€'
        } else {
          book.price += this.googleBookDetails.saleInfo.listPrice.currencyCode
        }
      }

      if (this.googleBookDetails.volumeInfo.description) {
        book.description = this.googleBookDetails.volumeInfo.description
      }
      return book
    },

    formattedReaderDetails () {
      if (!Object.entries(this.readerFavoriteDetails).length) {
        return null
      }

      let details = {}

      if (this.readerFavoriteDetails.created_at) {
        details.createdAt = moment(this.readerFavoriteDetails.created_at).format('DD-MM-YYYY')
      }

      if (this.readerFavoriteDetails.start_reading) {
        details.start = moment(this.readerFavoriteDetails.start_reading).format('DD-MM-YYYY')
      }

      if (this.readerFavoriteDetails.end_reading) {
        details.end = moment(this.readerFavoriteDetails.end_reading).format('DD-MM-YYYY')
      }

       if (this.readerFavoriteDetails.reader_rating) {
        details.readerRating = this.readerFavoriteDetails.reader_rating
      }

      if (this.readerFavoriteDetails.end_reading && this.readerFavoriteDetails.reading_time) {
        let end = moment(this.readerFavoriteDetails.end_reading)
        let start = moment(this.readerFavoriteDetails.start_reading)

        details.readingTime = end.diff(start, 'days') + ' days'
      }

      return details
    }
  },

  methods: {
    openEditModal () {
      this.modalInputsData.startReading = moment(this.readerFavoriteDetails.start_reading).format('YYYY-MM-DD')
      this.modalInputsData.endReading = moment(this.readerFavoriteDetails.end_reading).format('YYYY-MM-DD')
      this.modalInputsData.personalRating = this.readerFavoriteDetails.reader_rating

      this.isModalOpen = true
    }
  },

  created () {
    // validar se existe no vuex os dois objetos googleBookDetails e readerFavoriteDetails
    // se nao tiver entradas reencaminhar
    if (!Object.entries(this.googleBookDetails).length  || !Object.entries(this.readerFavoriteDetails).length) {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style lang="scss">
  input.form-control::placeholder {
    color: #bebcbca9;
  }
  h1.card-title {
    font-size: 4.5rem;
  }
  label {
    font-weight: 700;
  }

  .reader-details-entry {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .v-dialog .v-card {
    .v-card__title {
      background-color: #492750;
      color: white;
    }
    .v-card__text {
      text-align: left;
    }
  }
</style>