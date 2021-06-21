<template>
  <div>
    <div class="text-h3 pl-12 pt-12">
      Book preview
    </div>

    <v-card
      max-width="300"
      class="mx-auto mt-4"
    >
      <v-img
        :src= "volumeInfo.imageLinks.smallThumbnail"
        height="300px"
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

      <v-list two-line>
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
              size="14">
            </v-rating>

            <div class="grey--text ms-3">
              4 (405)
            </div>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">
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
            <v-icon color="indigo">
              mdi-account-supervisor
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Authors:</v-list-item-title>
            <v-list-item-subtitle>Nicholas Sparks</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: "books#volume",
      id: "TOGgtgEACAAJ",
      etag: "y2YAI/Nz85c",
      selfLink: "https://www.googleapis.com/books/v1/volumes/TOGgtgEACAAJ",
      volumeInfo: {
          title: "As palavras que nunca te direi",
          authors: [
            "Nicholas Sparks"
          ],
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
  }
}
</script>