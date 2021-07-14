<template>
  <!-- Child Component of List-->
  <div class="book-preview">
    <v-skeleton-loader
      class="mx-auto"
      max-width="430"
      max-height="200"
      type="image"
      v-if="!apiInfo">
    </v-skeleton-loader>

    <v-card
      :color="color"
      dark
      max-height="199"
      v-if="apiInfo">

      <div class="d-flex">
        <v-img
          v-if="apiInfo.volumeInfo && apiInfo.volumeInfo.imageLinks && apiInfo.volumeInfo.imageLinks.thumbnail"
          :src="apiInfo.volumeInfo.imageLinks.thumbnail"
          alt="Book Cover"
          max-width="128"
          max-height="200"
          min-width="128"
          min-height="200">
        </v-img>

        <v-img
          v-else
          alt="Book Cover"
          src="@/assets/bookNotFound.jpg"
          max-width="128"
          max-height="200"
          min-width="128"
          min-height="200">
        </v-img>

        <div style="display: flex; flex-direction: column; flex-grow: 2;">
          <span
            class="text-h5 custom-card-title"
            v-text="formattedBook.title">
          </span>

          <div style="height: 55px;">
            <v-rating
              v-if="readerFavoriteDetails.reader_rating"
              align="center"
              :value="readerFavoriteDetails.reader_rating"
              color="amber"
              readonly
              size="16">
            </v-rating>
          </div>

          <v-card-actions class="book-card-button">
            <v-btn
              align="center"
              outlined
              small
              @click="removeFavorite()">

              Remove

              <v-icon class="ml-2" color="amber lighten" small>mdi-close-thick</v-icon>
            </v-btn>

            <v-btn
              align="center"
              outlined
              small
              @click="goToDetails()">

              Show Details

              <v-icon class="ml-2" color="amber lighten" small>mdi-book-open-page-variant-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
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

  computed: {
    formattedBook () {
      if (!this.apiInfo) {
        return null
      }

      let book = {}

      book.title = this.apiInfo.volumeInfo.title

      return book
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
          // key: VUE_APP_API_KEY,
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
      //Stores in vuex
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

<style lang="scss">
.book-preview {
  .card {
    max-width: 540px;
    min-height: 280px;
  }

  img {
    margin: 20px 0px 25px 15px
  }

  .book-card-button {
    justify-content: center;
    margin-top: 5px;
  }

  .mark-as-favorite-icon {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .custom-card-title {
    padding: 20px 0px 0px 0px;
    word-break: normal !important;
    text-align: center;
    height: 82px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
}
</style>