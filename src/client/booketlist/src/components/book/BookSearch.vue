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

      <div id="background"></div>
        <div class="top mb-8">
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
          <p>Boo, looks like a ghost stole this page!</p>
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
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

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

  $white: #EDEDED;
  $gray: #BFC0C0;
  $dark: #585959;
  $light: #D3DEEA;

@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');

$big: 'Abril Fatface', serif;
$body: 'Lato', sans-serif;

body {
  background: $light;
}

.top {
  margin-top: 30px;
}

.ghost-drawing {
  margin: 0 auto;
  position: relative;
  width: 250px;
  height: 250px;
  margin-top: -40px;
}

.ghost {
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

.ghost-copy {
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
  z-index: 0;
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

.bottom {
  margin-top: 10px;
}

/*text styling*/
h2 {
  font-family: $big;
  color: $white;
  text-align: center;
  font-size: 4em;
  margin: 0;
  text-shadow: -1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray;
}
h3 {
  font-family: $body;
  font-size: 1em;
  text-transform: uppercase;
  text-align: center;
  color: $gray;
  margin-top: -20px;
  font-weight: 900;
}
p {
  text-align: center;
  font-family: $body;
  color: $dark;
  font-size: .6em;
  margin-top: -20px;
  text-transform: uppercase;
}
</style>