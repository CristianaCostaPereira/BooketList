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

        <v-card-actions class="book-card-button">
            <v-btn
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
              <label
                for="starReading"
                class="form-label">

                Start reading at:
              </label>

              <input
                class="form-control"
                type="date"
                id="starReading">
            </div>

            <div class="mb-3">
              <label
                for="endReading"
                class="form-label">

                End reading at:
              </label>

              <input
                class="form-control"
                type="date"
                id="endReading">
            </div>

            <div class="mb-3">
              <label
                for="readerPersonalRating"
                class="form-label">

                My personal rating:
              </label>

              <input
                class="form-control"
                type="text"
                id="readerPersonalRating">

              <!-- <v-rating
                v-if="readerRating"
                align="center"
                :value="readerRating"
                color="amber"
                size="16">
              </v-rating>

              <div class="grey--text ms-3" align="center">
                {{ readerRating }}
              </div> -->
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

import {
  mapGetters,
  // mapActions,
  // mapMutations
} from 'vuex'

export default {
  name: 'Show',

  data () {
    return {

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
      if (!this.googleBookDetails) {
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
    }
  },

  created() {

  }
}
</script>

<style>
  input.form-control::placeholder {
    color: #bebcbca9;
  }
  h1.card-title {
    font-size: 4.5rem;
  }
  label {
    font-weight: 700;
  }
</style>