<template>
  <div class="book-search pt-12">
    <div class="container">
      <div class="input-group">
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
        v-if="!isLoading && !searchedBooks.length">

          <div class="top">
            <h1>Welcome to your BooketList App</h1>
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
            <p>Go ahead, search for you favorite book!</p>
        </div>
      </div>
    </div>

    <div class="book-api-list">
      <v-row
        v-if="isLoading">
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="3"
          v-for="(n, index) in 12"
          :key="index">

          <v-skeleton-loader
            class="mx-auto"
            max-width="430"
            max-height="200"
            type="image">
          </v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row
        v-if="searchedBooks && !isLoading">

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
                <h5
                  class="book-title"
                  v-text="searchedBook.volumeInfo.title">
                </h5>

                <v-rating
                  align="center"
                  :value="searchedBook.volumeInfo.averageRating"
                  color="amber"
                  readonly
                  size="16">
                </v-rating>

                <div align="center">
                  {{ searchedBook.volumeInfo.ratingsCount }}
                </div>

                <v-card-actions class="book-card-button">
                  <v-btn
                    align="center"
                    outlined
                    small
                    @click="makeFavorite(searchedBook.id)">

                    Set as Favorite

                    <v-icon class=" ml-1" color="amber lighten" small>mdi-star-outline</v-icon>
                  </v-btn>

                  <v-btn
                    align="center"
                    outlined
                    small
                    @click="selectBook(searchedBook)">

                    Details

                    <v-icon class="ml-1" color="amber lighten" small>mdi-book-open-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Modal for book detail -->
    <v-row
      v-if="selectedBook"
      justify="center">

      <v-dialog
        v-model="showModal"
        width="70%">

        <v-card>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="row card-body">
                  <v-img
                    class="book-cover col-xs-12 col-lg-4"
                    v-if="selectedBook.volumeInfo && selectedBook.volumeInfo.imageLinks && selectedBook.volumeInfo.imageLinks.thumbnail"
                    :src="selectedBook.volumeInfo.imageLinks.thumbnail"
                    alt="Book Cover">
                  </v-img>

                  <v-img
                    v-else
                    class="col-xs-12 col-lg-4"
                    alt="Book Cover"
                    src="@/assets/bookNotFound.jpg"
                    max-width="128"
                    max-height="200"
                    min-width="128"
                    min-height="200">
                  </v-img>

                  <div class="card-content col-xs-12 col-lg-8">
                    <h2 class="card-title">
                      {{ selectedBook.volumeInfo.title }}
                    </h2>

                    <h3 class="card-title mt-5 mb-5">
                      {{ selectedBook.volumeInfo.subtitle }}
                    </h3>

                    <div class="card-text"
                      v-if="selectedBook.volumeInfo.authors">

                      <label>Author: </label>
                      {{ selectedBook.volumeInfo.authors[0] }}
                    </div>

                    <div class="card-text">
                      <label>Publish Date: </label>
                      {{ selectedBook.volumeInfo.publishedDate }}
                    </div>

                    <div class="card-text">
                      <label>Publisher: </label>
                      {{ selectedBook.volumeInfo.publisher }}
                    </div>

                    <div class="card-text">
                      <label>Number of Pages: </label>
                      {{ selectedBook.volumeInfo.pageCount }}
                    </div>

                    <div class="card-text"
                      v-if="selectedBook.volumeInfo.categories">

                      <label>Categories: </label>
                      {{ selectedBook.volumeInfo.categories[0] }}
                    </div>

                    <div
                      v-if="selectedBook.volumeInfo.averageRating"
                      class="card-text">

                      <label>Rating: </label>
                      {{ selectedBook.volumeInfo.averageRating }} ({{ selectedBook.volumeInfo.ratingsCount }})
                    </div>

                    <div class="card-text" v-if="selectedBook.saleInfo.listPrice">
                      <label>Price: </label>
                      {{ selectedBook.saleInfo.listPrice.amount }}€
                    </div>

                    <h5 class="description card-text">{{ selectedBook.volumeInfo.description }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="showModal = false">

              Close
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="modalMakeFavorite()">

              Mark as Favorite

              <v-icon class="ml-1" color="amber lighten">mdi-star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'BookSearch',

  data() {
    return {
      searchInput: '',
      searchedBooks: [],
      color: '#a97fa4e3',
      selectedBook: null,
      showModal: false,

      // Para armazenar o que precisamos para o pedido
      // O que vem da localStorage
      readerId: null,
      token: null,

      isLoading: false
    }
  },

  methods: {
    async bookSearch() {
      if (!this.searchInput) {
        return
      }

      this.searchedBooks = []

      this.isLoading = true

      // vai à API externa buscar a lista de livros que dê match ao input
      const API_KEY = await process.env.API_KEY

      let config = {
        params: {
          q: this.searchInput, // quando o input é submetido, faz pedido à api do google
          // key: API_KEY,
          maxResults: '12'
        }
      }

      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', config)

      this.isLoading = false

      // guardar os resultados no []
      this.searchedBooks = response.data.items
    },

    selectBook(book) {
      // guarda o livro que seleccionei
      this.selectedBook = book

      // Only open modal after this.selectedBook is field
      this.showModal = true
    },

    // vai buscar o token e o id do user e envia para o server
    // pedido BE com o id do reader + id do livro seleccionado
    async makeFavorite(googleApiId) {
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

        this.$notify({
          title: response.data.status,
          text: response.data.message,
          type: response.data.status,
          duration: 2000,
          speed: 1000
        })

      } catch (error) {
        console.error(error)
      }
    },

    modalMakeFavorite () {
      this.makeFavorite(this.selectedBook.id)
      this.showModal = false
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
.book-search {
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');

  $white: #EDEDED;
  $gray: #BFC0C0;
  $dark: #585959;
  $big: 'Abril Fatface', serif;

  input.form-control::placeholder {
    color: #bebcbca9;
  }

  .form-control {
    padding: 10px;
  }

  .top {
    margin-top: 120px;
    margin-bottom: 65px;

    h1 {
      font-family: $big;
      color: #8d6856;
      text-align: center;
      font-size: 5em !important;
      text-shadow: -1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray;
    }
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

  h2.card-title {
    font-size: 4.5rem;
  }

  h5.description {
    text-align: justify;
    margin: 40px 0px 0px 100px;
  }

  label {
    font-weight: 700;
  }

  p {
    font-family: 'Abril Fatface', cursive;
    text-align: center;
    color: #733e38cf;
    font-size: 23px;
  }

  .book-title {
    text-align: center;
    font-size: 24px;
  }

  .book-api-list {
    padding: 35px;
  }

  .api-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 32px 0px -5px;
  }

  .row.card-body {
    display: flex;
    margin: 5px;
    flex-direction: row;
    align-items: center;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .book-card-button {
    margin-left: 20px;
  }

  .book-cover {
    margin-left: 50px;
    max-width: 300px;
    // max-height: 450px;
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
}
</style>