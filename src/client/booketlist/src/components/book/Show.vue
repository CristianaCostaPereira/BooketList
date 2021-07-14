<template>
  <div class="show-favorite container mt-12">
    <div class="card mb-3" style="max-width: 1800px;">
      <div
        class="favorite-container d-flex"
        v-if="formattedReaderDetails && formattedBook">

        <div class="card-column thumbnail" style="margin-left: 15px;">
          <v-img
            v-if="googleBookDetails.volumeInfo && googleBookDetails.volumeInfo.imageLinks && googleBookDetails.volumeInfo.imageLinks.thumbnail"
            :src="googleBookDetails.volumeInfo.imageLinks.thumbnail"
            alt="Book Cover"
            min-width="300">
          </v-img>

          <v-img
            v-else
            alt="Book Cover"
            src="@/assets/bookNotFoundBig.png"
            min-width="300"
            min-height="500">
          </v-img>
        </div>

        <div
          class="card-column"
          v-if="formattedBook">

          <div class="card-content col-xs-12 col-lg-12">

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
              class="mt-4"
              align="center"
              :value="formattedBook.averageRating"
              color="amber"
              readonly
              size="26">
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

        <!-- Reader story -->
        <v-card
          v-if="readerFavoriteDetails"
          class="card-column personal-info mx-auto"
          color="purple darken-3"
          dark
          max-width="400">

          <v-card-title>
            <v-icon
              large
              left>

              mdi-star-face
            </v-icon>

            <span class="text-h5 font-weight-light">My Story</span>

            <v-spacer></v-spacer>

            <v-btn icon
              @click="removeFavoriteBook()">

              <v-icon>mdi-star-remove</v-icon>
            </v-btn>

            <v-btn icon
              @click="openEditModal()">

              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>

          <div class="p-3">
            <v-card-text class="text-h5 font-weight-bold mt-6">
              “A room without books is like a body without a soul.”  — Cicero
            </v-card-text>

            <v-rating
              class="mt-7 mb-7"
              align="center"
              :value="formattedReaderDetails.readerRating"
              color="amber"
              readonly
              size="48">
            </v-rating>

            <v-card-text class="text-h6 font-weight-bold">
              <div class="reader-details-entry mb-1">
                <span class="pr-1">Added on:</span>

                {{ formattedReaderDetails.createdAt }}
              </div>

              <div class="reader-details-entry mb-1">
                <span class="pr-1">Start on:</span>

                {{ formattedReaderDetails.start }}
              </div>

              <div class="reader-details-entry mb-1">
                <span class="pr-1">End on:</span>

                {{ formattedReaderDetails.end }}
              </div>

              <div class="reader-details-entry mb-1">
                <span class="pr-1">Purchased on:</span>

                {{ formattedReaderDetails.purchaseDate }}
              </div>

              <div class="reader-details-entry mb-1">
                <span class="pr-1">Edition:</span>

                {{ formattedReaderDetails.edition }}
              </div>

              <div class="reader-details-entry mb-1">
                <span class="pr-1">Reading Time:</span>

                {{ formattedReaderDetails.readingTime }}
              </div>
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

            <div class="error" v-if="$v.modalInputsData.startReading.$dirty && !$v.modalInputsData.startReading.isDate">Must be a date</div>
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

            <div class="error" v-if="$v.modalInputsData.endReading.$dirty && !$v.modalInputsData.endReading.isDate">Must be a date</div>
          </div>

          <div class="mb-5">
            <label
              for="purchaseDate">

              Purchased at:
            </label>

            <input
              class="form-control"
              type="date"
              id="purchaseDate"
              v-model="modalInputsData.purchaseDate">

            <div class="error" v-if="$v.modalInputsData.purchaseDate.$dirty && !$v.modalInputsData.purchaseDate.isDate">Must be a date</div>
          </div>

          <div class="mb-5">
            <label
              for="edition">

              Edition:
            </label>

            <input
              class="form-control"
              type="text"
              id="edition"
              v-model="modalInputsData.edition">

            <div class="error" v-if="$v.modalInputsData.edition.$dirty && !$v.modalInputsData.edition.numeric">Must be a number</div>
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

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="deep-purple lighten-2"
            text
            @click="closeModal()">

            CLOSE
          </v-btn>

          <v-btn
            color="deep-purple lighten-2"
            text
            @click="updateFavorite()">

            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import moment from 'moment'
import { numeric } from 'vuelidate/lib/validators'

const axios = require('axios')

function isDate(value) {
  return value === null || moment(value, 'YYYY-MM-DD', true).isValid()
}

export default {
  name: 'Show',

  data () {
    return {
      isModalOpen: false,

      modalInputsData: {
        startReading: null,
        endReading: null,
        purchaseDate: null,
        edition: null,
        personalRating: null,
      }
    }
  },

  validations: {
    modalInputsData: {
      startReading: {
        isDate (value) {
          return isDate(value)
        },
      },

      endReading: {
        isDate (value) {
          return isDate(value)
        },
      },

      purchaseDate: {
        isDate (value) {
          return isDate(value)
        },
      },

      edition: {
        numeric
      }
    }
  },

  computed: {
    ...mapGetters(['googleBookDetails', 'readerFavoriteDetails']),

    // buildImageSource () {
    //   if (
    //     this.googleBookDetails.volumeInfo &&
    //     this.googleBookDetails.volumeInfo.imageLinks &&
    //     this.googleBookDetails.volumeInfo.imageLinks.thumbnail) {

    //     return this.googleBookDetails.volumeInfo.imageLinks.thumbnail
    //   }
    //   return '@/assets/bookNotFound.jpg'
    // },

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

      if (this.readerFavoriteDetails.purchase_date) {
        details.purchaseDate = moment(this.readerFavoriteDetails.purchase_date).format('DD-MM-YYYY')
      }

      if (this.readerFavoriteDetails.edition_number) {
        details.edition = this.readerFavoriteDetails.edition_number + 'ª'
      }

      if (this.readerFavoriteDetails.reader_rating) {
        details.readerRating = this.readerFavoriteDetails.reader_rating
      }

      if (this.readerFavoriteDetails.reading_time) {
        details.readingTime = this.readerFavoriteDetails.reading_time + ' days'
      }

      return details
    }
  },

  methods: {
    ...mapMutations([
      'updateReaderFavoriteDetails'
    ]),

    openEditModal () {

      let startReading = moment(this.readerFavoriteDetails.start_reading)
      this.modalInputsData.startReading = startReading.isValid() ? startReading.format('YYYY-MM-DD') : null

      let endReading = moment(this.readerFavoriteDetails.end_reading)
      this.modalInputsData.endReading = endReading.isValid() ? endReading.format('YYYY-MM-DD') : null

      let purchaseDate = moment(this.readerFavoriteDetails.purchase_date)
      this.modalInputsData.purchaseDate = purchaseDate.isValid() ? purchaseDate.format('YYYY-MM-DD') : null

      this.modalInputsData.edition = this.readerFavoriteDetails.edition_number
      this.modalInputsData.personalRating = this.readerFavoriteDetails.reader_rating

      this.isModalOpen = true
    },

    closeModal () {
      this.isModalOpen = false
    },

    async updateFavorite() {
      // pedido ao server para update
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      let readerId = this.readerFavoriteDetails.reader_id
      let bookId = this.readerFavoriteDetails.book_id

      if (!readerId || !bookId) {
        return
      }

      let readingTime = null

      if (this.modalInputsData.startReading && this.modalInputsData.endReading) {
        let start = moment(this.modalInputsData.startReading)
        let end = moment(this.modalInputsData.endReading)

        readingTime = end.diff(start, 'days')
      }

      let data = {
        start_reading: this.modalInputsData.startReading,
        end_reading: this.modalInputsData.endReading,
        purchase_date: this.modalInputsData.purchaseDate,
        reader_rating: this.modalInputsData.personalRating,
        reading_time: readingTime,
        edition_number: this.modalInputsData.edition
      }

      const response = await axios.put(`http://localhost:3000/readers/${readerId}/books/${bookId}`, data)

      this.$notify({
        title: response.data.status,
        text: response.data.message,
        type: response.data.status,
        duration: 2000,
        speed: 1000
      })

      //se sucesso update no vuex
      this.updateReaderFavoriteDetails(data)

      this.closeModal()
    },

    async removeFavoriteBook () {
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

          this.$notify({
            title: response.data.status,
            text: response.data.message,
            type: response.data.status,
            duration: 2000,
            speed: 1000
          })

          this.$router.push({ name: 'FavoriteList' })

        } catch (error) {
          console.error(error)
        }
      }
    }
  },

  created () {
    // validar se existe no vuex os dois objetos googleBookDetails e readerFavoriteDetails
    // se nao tiver entradas reencaminhar
    if (!Object.entries(this.googleBookDetails).length  || !Object.entries(this.readerFavoriteDetails).length) {
      this.$router.push({ name: 'BookSearch' })
    }
  }
}
</script>

<style lang="scss">
.show-favorite{
  .card-content {
    padding: 50px;
  }

  input.form-control::placeholder {
    color: #bebcbca9;
  }

  h1.card-title {
    font-size: 4.5rem;
  }

  h2.card-title {
    font-size: 90px;
    color: darkgoldenrod;
  }

  h5.description.card-text {
    text-align: justify;
    margin: 90px 40px 40px 40px;
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

  .thumbnail {
    margin-top: 70px;
  }

  .favorite-container {
    flex-direction: row;
  }

  @media (max-width: 1200px) {
    .favorite-container {
      flex-direction: column;
      align-items: center;
      margin: 20px 0px 20px 0px;

      .thumbnail {
        margin-top: 20px;
      }

      .personal-info {
        max-width: 700px !important;

      }

      h5 {
        font-size: 25px;
      }
    }
  }
}
</style>