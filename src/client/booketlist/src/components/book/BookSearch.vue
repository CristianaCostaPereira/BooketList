<template>
  <div class="pt-12">
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

      <!-- Ghosty welcome page -->
      <div
        class="ghost-welcome-page"
        v-if="!searchedBooks.length">

        <div id="background"></div>

          <div class="top">
            <h2>Welcome to you BooketList App</h2>
          </div>

          <div class="ghost-drawing">
            <div class="ghost-copy">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
              <div class="four"></div>
            </div>

            <div class="ghost">
              <div class="face">
                <div class="eye"></div>
                <div class="eye-right"></div>
                <div class="mouth"></div>
              </div>
            </div>

            <div class="shadow"></div>
          </div>

          <div class="bottom">
            <p>Booo, looks like a ghost loves this page!</p>
        </div>
      </div>
    </div>

    <div class="book-api-list">
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
            max-height="200">

            <div class="d-flex align-items-center">
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

              <div class="api-card-content">
                <v-card-title
                  class="text-h5"
                  align="center"
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

                <v-card-actions class="book-card-button">
                  <v-btn
                    align="center"
                    outlined
                    small
                    @click="makeFavorite(searchedBook.id)">

                    Mark as Favorite

                    <v-icon class="mark-as-favorite-icon ml-2" color="amber lighten">mdi-star-outline</v-icon>
                  </v-btn>
                </v-card-actions>
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
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

export default {
  name: 'BookSearch',

  data() {
    return {
      searchInput: 'da vinci code',
      searchedBooks: [],
      color: '#a97fa4e3',

      // Para armazenar o que precisamos para o pedido
      // O que vem da localStorage
      readerId: null,
      token: null
    }
  },

  methods: {
    async bookSearch() {
      this.searchedBooks = []

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
    },

    async makeFavorite(googleApiId) {
      // pedido BE com o id do reader + id do livro seleccionado
      // O que vai no body
      let data = {
        google_api_id: googleApiId
      }
      let config = {
        headers: {
          'Authorization': this.token
        }
      }

      try {
        const response = await axios.post(`http://localhost:3000/readers/${this.readerId}/books/make-favorite`, data, config)

      } catch (error) {
        console.error(error)
      }

      // No BE:
      // 1º ver se existe o livro na BD
      // Caso exista colocar na tabela pivot book-reader o id do livro e do reader
      // Caso não exista 1o coloca na tabela book e de seguida coloca como favorito

    }
  },

  created () {
    // To get the logged reader id (dinamic in my request)
    let readerInfoString = window.localStorage.getItem('reader-info')
    let readerInfoObject = JSON.parse(readerInfoString)

    this.readerId = readerInfoObject.readerId

    this.token = window.localStorage.getItem('book-token')
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');

  $white: #EDEDED;
  $gray: #BFC0C0;
  $dark: #585959;
  $big: 'Abril Fatface', serif;

  input.form-control::placeholder {
    color: #bebcbca9;
  }


  .top {
    margin-top: 120px;
    margin-bottom: 65px;
  }

  .ghost-drawing {
    margin: 0 auto;
    position: relative;
    width: 250px;
    height: 250px;
    margin-top: -40px;
  }

  .ghost, .ghost-copy {
    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    position: absolute;
    border-radius: 50% 50% 0 0;
    background: $white;
    border: 1px solid $gray;
    border-bottom: none;
    animation: float 2s ease-out infinite;
  }

  .face {
    position: absolute;
    width: 100%;
    height: 60%;
    top: 20%;
  }

  .eye, .eye-right {
    position: absolute;
    background: $dark;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    top: 40%;
  }

  .eye {
    left: 25%;
  }
  .eye-right {
    right: 25%;
  }

  .mouth {
    position:absolute;
    top: 50%;
    left: 45%;
    width: 10px;
    height: 10px;
    border: 3px solid;
    border-radius: 50%;
    border-color: transparent $dark $dark transparent;
    transform: rotate(45deg);
  }

  .one, .two, .three, .four {
    position: absolute;
    background: $white;
    top: 85%;
    width: 25%;
    height: 23%;
    border: 1px solid $gray;
    z-index: 0;
  }

  .one {
    border-radius: 0 0 100% 30%;
    left: -1px;
  }

  .two {
    left: 23%;
    border-radius: 0 0 50% 50%;
  }

  .three {
    left: 50%;
    border-radius: 0 0 50% 50%;
  }

  .four {
    left: 74.5%;
    border-radius: 0 0 30% 100%;
  }

  .shadow {
    position: absolute;
    width: 30%;
    height: 7%;
    background: $gray;
    left: 35%;
    top: 80%;
    border-radius: 50%;
    animation: scale 2s infinite;
  }

  .bottom {
    font-size: 25px;
    margin-top: 10px;
  }

  /*text styling*/
  h2 {
    font-family: $big;
    color: #8d6856;
    text-align: center;
    font-size: 4em;
    margin: 0;
    text-shadow: -1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray;
  }

  h3 {
    font-size: 1em;
    text-transform: uppercase;
    text-align: center;
    color: $gray;
    margin-top: -20px;
    font-weight: 900;
  }

  p {
    font-family: 'Abril Fatface', cursive;
    text-align: center;
    color: #733e38cf;
    font-size: 23px;
  }

  .book-api-list {
    padding: 35px;
  }

  .api-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 32px 0px 30px;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes float {
    50% {
      transform: translateY(15px);
    }
  }
</style>