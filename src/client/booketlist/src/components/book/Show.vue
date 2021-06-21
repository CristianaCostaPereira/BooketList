
  <template>
  <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
            class="mr-4"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h4 pl-12 pt-12">
            Book preview
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-book-open-page-variant
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Title:</v-list-item-title>
          <v-list-item-subtitle>As Palavras que nunca te direi</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-bookshelf
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Authors:</v-list-item-title>
          <v-list-item-subtitle>Nicholas Sparks</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-bookshelf
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Published Date:</v-list-item-title>
          <v-list-item-subtitle>2017</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>