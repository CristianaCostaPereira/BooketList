<template>
  <v-card class="container">
    <v-row>
      <v-col
        v-for="favoriteBook in favoriteBooks"
        :key="favoriteBook.id"
        cols="12"
        sm="5"
        md="4"
        lg="3"
      >
        <!-- Another possible look for display my list of favorite books -->
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="volumeInfo.imageLinks.smallThumbnail" alt="sans" style="margin-left: 15px; margin-top: 20px; margin-bottom: 25px">
            </div>

            <div class="col-md-8">
              <div class="card-body ml-4">
                <v-icon color="red lighten-3" style="margin-left: 190px;">mdi-heart</v-icon>

                <h5 class="card-title" align="center">{{ volumeInfo.title }}</h5>

                <p class="card-text" align="center">{{ volumeInfo.authors }}</p>

                <v-rating
                  align="center"
                  :value="4"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="18">
                </v-rating>

                <div class="grey--text ms-3" align="center">
                  4 (405)
                </div>
              </div>
            </div>
          </div>
        </div>

        <v-card
          max-width="300"
          class="mx-auto mt-4"
        >
          <v-img
            :src= "volumeInfo.imageLinks.smallThumbnail"
            height="450px"
            dark
          >
            <v-row
              justify="end"
              class="fill-height mt-2 mr-2">

              <v-btn
                dark
                icon
              >
                <v-icon color="red lighten-3">mdi-heart</v-icon>
              </v-btn>
            </v-row>
          </v-img>

          <v-list>
            <v-card-text>
              <v-row
                align="center"
                class="mx-0 mb-1"
              >
                <v-rating
                  :value="4"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="18">
                </v-rating>

                <div class="grey--text ms-3">
                  4 (405)
                </div>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#713c36">
                  mdi-book-open-page-variant
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Title:</v-list-item-title>
                <v-list-item-subtitle>{{ volumeInfo.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#713c36">
                  mdi-account-multiple
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Authors:</v-list-item-title>
                <v-list-item-subtitle>{{ volumeInfo.authors }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const axios = require('axios')

export default {
  data () {
    return {
      favoriteBooks: [],

      kind: "books#volume",
      id: "TOGgtgEACAAJ",
      etag: "y2YAI/Nz85c",
      selfLink: "https://www.googleapis.com/books/v1/volumes/TOGgtgEACAAJ",
      volumeInfo: {
        title: "As palavras que nunca te direi",
        authors: "Nicholas Sparks",
        publisher: "ASA",
        publishedDate: "2017",
        description: "As palavras que nunca te direi Tenho-as dentro do meu coração, Saem através de mim com emoção, São levadas para onde, não sei. São o som da expressão do que sinto, São como verdades ditas em oração, São pensamentos voláteis e ilusão.",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "989233910X"
          },
          {
            type: "ISBN_13",
            identifier: "9789892339108"
          }
        ],
        readingModes: {
          text: false,
          image: false
        },
        pageCount: 319,
        printedPageCount: 319,
        dimensions: {
          height: "24.00 cm"
        },
        printType: "BOOK",
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false
        },
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=TOGgtgEACAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE72TuOySCkSzyeMwZ2qx64StJQJ1FR0WzMVLtxmkqrAcdAU8MOaSuL5jwgBIJeJDSQgQkw58Mq8M-tGu9OaGufPIVHAD-xA6TIcjEapLBAHjhjkRPBkyo97xKuUxRYDSFzlKn3-S&source=gbs_api",
          thumbnail: "http://books.google.com/books/content?id=TOGgtgEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE713GW9wO7Aq4hV3oaqcx0ip6M31wROshuE79bAk8eU39HGNr7ywtyLY0lou7mSHrs_OYmr67fgjmmDyPRo_K7tiWWvR1riHFQDepRWy5Ehg4-ihA6p_VQVLm9umh8G2QLMeRfmj&source=gbs_api"
        },
        language: "pt",
        previewLink: "http://books.google.pt/books?id=TOGgtgEACAAJ&hl=&source=gbs_api",
        infoLink: "https://play.google.com/store/books/details?id=TOGgtgEACAAJ&source=gbs_api",
        canonicalVolumeLink: "https://play.google.com/store/books/details?id=TOGgtgEACAAJ"
      },
      saleInfo: {
        country: "PT",
        saleability: "NOT_FOR_SALE",
        isEbook: false
      },
      accessInfo: {
        country: "PT",
        viewability: "NO_PAGES",
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false
        },
        pdf: {
          "isAvailable": false
        },
        webReaderLink: "http://play.google.com/books/reader?id=TOGgtgEACAAJ&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "NONE",
        quoteSharingAllowed: false
      }
    }
  },

  methods: {
    async fetchFavoritesBooks() {
      let retrievedToken = window.localStorage.getItem('book-token')

      let config = {
        headers: {
          'Authorization': retrievedToken
        }
      }
      try {
        const response = await axios.get('http://localhost:3000/readers/2/books', config)
        console.log(response.data)

        this.favoriteBooks = response.data.data

      } catch (error) {
        console.error(error)
      }
    }
  },

  created () {
    this.fetchFavoritesBooks()
  }
}
</script>