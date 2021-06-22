<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="row card-body">
            <img class="col-xs-12 col-lg-4" :src="volumeInfo.imageLinks.smallThumbnail" alt="sans"/>

            <div class="col-xs-12 col-lg-8">
              <h1 class="card-title">title</h1>

              <h5 class="card-text plot mt-4 mb-4">a lot of text, description</h5>

              <div class="card-text">
                <label>Year: </label>
              </div>

              <div class="card-text">
                <label>Runtime: </label>
              </div>

              <div class="card-text">
                <label>Genre: </label>
              </div>

              <div class="card-text">
                <label>Director: </label>
              </div>

              <div class="card-text">
                <label>Actors: </label>
              </div>

              <div class="card-text">
                <label>Awards: </label>
              </div>
              
              <div class="card-text mb-4">
                <label>BoxOffice: </label>
              </div>

              <div class="row">
                <div class="col-sm-4 score-cards">

                  <div class="score-class">
                    <span><b>{{ volumeInfo.averageRating }}</b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Movies',

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
        description: "*INCLUDES AN EXTRACT FROM ORIGIN,THE NEW THRILLER BY DAN BROWN: OUT NOW* --------------------------------------------------------------------------------------------------- Harvard professor Robert Langdon receives an urgent late-night phone call while on business in Paris: the elderly curator of the Louvre has been brutally murdered inside the museum. Alongside the body, police have found a series of baffling codes. As Langdon and a gifted French cryptologist, Sophie Neveu, begin to sort through the bizarre riddles, they are stunned to find a trail that leads to the works of Leonardo Da Vinci - and suggests the answer to a mystery that stretches deep into the vault of history. Unless Langdon and Neveu can decipher the labyrinthine code and quickly assemble the pieces of the puzzle, a stunning historical truth will be lost forever...",
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
  .welcome-card {
    font-size: 50px;
  }
  h1.card-title {
    font-size: 4.5rem;
  }
  h5.plot {
    text-align: justify;
    padding: 0px 20px 0px 20px
  }
  .score-cards {
    display: flex;
    justify-content: space-evenly;
  }
  .score-class {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #e9c51edb;
    border: 2px solid #9a6c6454;
    padding: 10px;
    width: 230px;
    height: 100px;
    border-radius: 10%;
  }
  label {
    font-weight: 700;
  }
  .icon {
    font-weight: 700;
    padding-left: 5px;
  }
  .imdb-button {
    width: 100%;
  }
  .imdb-button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }