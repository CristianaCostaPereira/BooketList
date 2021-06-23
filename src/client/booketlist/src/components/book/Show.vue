<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="row card-body">
            <img class="col-xs-12 col-lg-4" :src="volumeInfo.imageLinks.smallThumbnail" alt="sans"/>

            <div class="col-xs-12 col-lg-8">
              <h1 class="card-title">{{ volumeInfo.title }}</h1>

              <h5 class="card-text mt-4 mb-4">{{ volumeInfo.description }}</h5>

              <div class="card-text">
                <label>Authors: </label>
                {{ volumeInfo.authors }}
              </div>

              <div class="card-text">
                <label>Publish Date: </label>
                {{ volumeInfo.publishedDate }}
              </div>

              <div class="card-text">
                <label>Publisher: </label>
                {{ volumeInfo.publisher }}
              </div>

              <div class="card-text">
                <label>Number of Pages: </label>
                {{ volumeInfo.pageCount }}
              </div>

              <div class="card-text">
                <label>Categories: </label>
                {{ volumeInfo.categories }}
              </div>

              <div class="card-text">
                <label>Rating: </label>
                {{ volumeInfo.averageRating }}

                <br>

                <label>Rating Counts: </label>
                {{ volumeInfo.ratingsCount }}
              </div>

              <div class="card-text mb-4">
                <label>Price: </label>
                {{ saleInfo.listPrice.amount }}€
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="volumeInfo.imageLinks.smallThumbnail" alt="sans">
        </div>
        
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Show',

  data () {
    return {
      kind: "books#volume",
      id: "ivzfRJGrdFsC",
      etag: "8IYKt1qUYrQ",
      selfLink: "https://www.googleapis.com/books/v1/volumes/ivzfRJGrdFsC",
      volumeInfo: {
        title: "The Da Vinci Code",
        subtitle: "(Robert Langdon Book 2)",
        authors: [
          "Dan Brown"
        ],
        publisher: "Random House",
        publishedDate: "2010-07-06",
        description: "Harvard professor Robert Langdon receives an urgent late-night phone call while on business in Paris: the elderly curator of the Louvre has been brutally murdered inside the museum. Alongside the body, police have found a series of baffling codes. As Langdon and a gifted French cryptologist, Sophie Neveu, begin to sort through the bizarre riddles, they are stunned to find a trail that leads to the works of Leonardo Da Vinci - and suggests the answer to a mystery that stretches deep into the vault of history. Unless Langdon and Neveu can decipher the labyrinthine code and quickly assemble the pieces of the puzzle, a stunning historical truth will be lost forever...",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781409091158"
          },
          {
            type: "ISBN_10",
            identifier: "1409091155"
          }
        ],
        readingModes: {
          text: true,
          image: false
        },
        pageCount: 592,
        printType: "BOOK",
        categories: [
          "Fiction"
        ],
        averageRating: 3,
        ratingsCount: 3462,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "0.23.22.0.preview.2",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false
        },
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=ivzfRJGrdFsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "http://books.google.com/books/content?id=ivzfRJGrdFsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        language: "un",
        previewLink: "http://books.google.pt/books?id=ivzfRJGrdFsC&printsec=frontcover&dq=the+da+vinci+code&hl=&cd=1&source=gbs_api",
        infoLink: "https://play.google.com/store/books/details?id=ivzfRJGrdFsC&source=gbs_api",
        canonicalVolumeLink: "https://play.google.com/store/books/details?id=ivzfRJGrdFsC"
      },
      saleInfo: {
        country: "PT",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 8.49,
          currencyCode: "EUR"
        },
        retailPrice: {
          amount: 8.49,
          currencyCode: "EUR"
        },
        buyLink: "https://play.google.com/store/books/details?id=ivzfRJGrdFsC&rdid=book-ivzfRJGrdFsC&rdot=1&source=gbs_api",
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 8490000,
              currencyCode: "EUR"
            },
            retailPrice: {
              amountInMicros: 8490000,
              currencyCode: "EUR"
            }
          }
        ]
      },
      accessInfo: {
        country: "PT",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "http://books.google.pt/books/download/The_Da_Vinci_Code-sample-epub.acsm?id=ivzfRJGrdFsC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        webReaderLink: "http://play.google.com/books/reader?id=ivzfRJGrdFsC&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false
      },
      searchInfo: {
        textSnippet: "*INCLUDES AN EXTRACT FROM ORIGIN,THE NEW THRILLER BY DAN BROWN: OUT NOW* ---------------------------------------- Harvard professor Robert Langdon receives an urgent late-night ..."
      }
    }
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