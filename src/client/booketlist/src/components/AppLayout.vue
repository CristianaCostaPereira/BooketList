<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      dark
      src="@/assets/side_menu.jpg"
    >

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/chairghosty.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ readerInfo.firstName + ' ' + readerInfo.lastName }}
          </v-list-item-title>

          <v-list-item-subtitle>
            My BooketList
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      src="@/assets/book6.jpg"
      dark>

      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-btn icon x-large>
          <v-icon>mdi-ghost</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>

      <v-toolbar-title>BooketList</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="logout()">

        <v-icon class="mr-8">mdi-ghost-off</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'AppLayout',

    data () {
      return {
        menuItems: [
          { title: 'Book Search', icon: 'mdi-book-open-page-variant', to: '/' },
          { title: 'My BooketList', icon: 'mdi-bookshelf', to: 'favorite-list' }
        ],
        drawer: null,
        readerInfo: null
      }
    },

    methods: {
      logout() {
        // Removes token and readerInfo from localStorage
        window.localStorage.removeItem('book-token')
        window.localStorage.removeItem('reader-info')

        // Redirects to login
        this.$router.push({ name: 'Login' })
      }
    },

    created () {
      this.readerInfo = JSON.parse(window.localStorage.getItem('reader-info')) // transform the JSON string to object
    }
  }
</script>
