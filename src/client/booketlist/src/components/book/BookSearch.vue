<template>
  <div class="p-4">
    <div class="container">
      <div class="input-group flex-nowrap">
        <input
          type="text"
          class="form-control"
          placeholder="Search Book Title / Writer"
          v-model="searchInput"
          @keyup.enter="bookSearch()">

        <span
          class="input-group-text"
          id="addon-wrapping"
          @click="bookSearch()">

          <v-icon>mdi-book-search-outline</v-icon>
        </span>
      </div>
    </div>

    <div>
      <v-row
        v-if="searchedBooks">
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="3"
          v-for="(searchedBook, index) in searchedBooks"
          :key="index">

          <v-card
            :color="color"
            dark
            max-height="199">

            <div class="d-flex flex-no-wrap justify-between">
              <v-img
                v-if="searchedBook.volumeInfo && searchedBook.volumeInfo.imageLinks && searchedBook.volumeInfo.imageLinks.thumbnail"
                :src="searchedBook.volumeInfo.imageLinks.thumbnail"
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

              <div>
                <v-card-title
                  class="text-h5"
                  v-text="searchedBook.volumeInfo.title">
                </v-card-title>

                <v-rating
                  align="center"
                  :value="searchedBook.volumeInfo.averageRating"
                  color="amber"
                  readonly
                  size="16">
                </v-rating>

                <div class="ms-3" align="center">
                  {{ searchedBook.volumeInfo.ratingsCount }}
                </div>

                <!-- <v-card-actions class="book-card-button">
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
                </v-card-actions> -->
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
// const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

export default {
  name: 'BookSearch',

  data() {
    return {
      searchInput: 'da vinci code',
      searchedBooks: [],
      color: '#a97fa4e3'
    }
  },

  methods: {
    async bookSearch() {
      // vai à API externa buscar a lista de livros que dê match ao input
      const API_KEY = await process.env.API_KEY

      let config = {
        params: {
          q: this.searchInput,
          key: API_KEY
        }
      }

      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', config)

      // guardar os resultados no []
      this.searchedBooks = response.data.items


      // max results
      // paginação / offset
    }
  }
}
</script>

<style lang="scss">
  input.form-control::placeholder {
    color: #bebcbca9;
  }
</style>