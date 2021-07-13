<template>
  <!-- Child Component of List-->
  <div>
    <v-card
      :color="color"
      dark
      max-height="199"
      v-if="apiInfo">

      <div class="d-flex flex-no-wrap justify-between">
        <v-img
          :src="apiInfo.volumeInfo.imageLinks.thumbnail"
          alt="Book Cover"
          max-width="128"
          max-height="200"
          min-width="128"
          min-height="200">
        </v-img>

        <div>
          <v-card-title
            class="text-h5"
            v-text="apiInfo.volumeInfo.title">
          </v-card-title>

          <v-rating
            v-if="readerFavoriteDetails.reader_rating"
            align="center"
            :value="readerFavoriteDetails.reader_rating"
            color="amber"
            readonly
            size="16">
          </v-rating>

          <div class="grey--text ms-3" align="center">
            {{ readerFavoriteDetails.reader_rating }}
          </div>

          <v-card-actions class="book-card-button">
            <v-btn
              align="center"
              outlined
              small
              @click="removeFavorite()">

              <!-- data-bs-toggle="modal"
              data-bs-target="#favoriteBookModal" -->

              Remove

              <v-icon class="heart-icon ml-2" color="amber lighten" small>mdi-close-thick</v-icon>
            </v-btn>

            <v-btn
              align="center"
              outlined
              small
              @click="goToDetails()">

              Show Details

              <v-icon class="heart-icon ml-2" color="amber lighten" small>mdi-book-open-page-variant-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <!-- Modal for personal book details-->
    <!-- <div class="modal fade" id="favoriteBookModal" tabindex="-1" aria-labelledby="favoriteBookModalLabel" aria-hidden="true">
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

              <v-rating
                v-if="readerFavoriteDetails.reader_rating"
                align="center"
                :value="readerFavoriteDetails.reader_rating"
                color="amber"
                size="16">
              </v-rating>

              <div class="grey--text ms-3" align="center">
                {{ readerFavoriteDetails.reader_rating }}
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
              data-bs-dismiss="modal">

              Save changes
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

const axios = require('axios')

export default {
  // Child Component
  props: {
    readerFavoriteDetails: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      apiInfo: null,
      color: '#492750'
    }
  },

  methods: {
    ...mapMutations([
      'setGoogleBookDetails', 'setReaderFavoriteDetails'
    ]),

    async removeFavorite () {
      let result = await this.$swal({
        title: 'Are you sure you want to remove this book from your favorites?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00557a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
    })

      if (result.isConfirmed) {
        try {
          let readerId = this.readerFavoriteDetails.reader_id
          let bookId = this.readerFavoriteDetails.book_id

          if (!readerId || !bookId) {
            return
          }

          const response = await axios.delete(`http://localhost:3000/readers/${readerId}/books/${bookId}`)

          if (response.data.status !== 'success') {
            //TODO: mensagem
            return
          }

          // this.$router.push({ name: 'FavoriteList' })
          this.$emit('deleted')

        } catch (error) {
          console.error(error)
        }
      }
    },

    async fetchBookDetails() {
      const VUE_APP_API_KEY = process.env.VUE_APP_API_KEY

      let config = {
        params: {
          key: VUE_APP_API_KEY,
          q: this.readerFavoriteDetails.google_api_id
        }
      }
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', config)

        this.apiInfo = response.data.items[0]

      } catch (error) {
        console.error(error)
      }
    },

    goToDetails() {
      this.setGoogleBookDetails(this.apiInfo)

      this.setReaderFavoriteDetails(this.readerFavoriteDetails)

      this.$router.push({ name: 'Show'})
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