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
            Menu
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
          v-for="item in items"
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
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-ghost', to: '/' },
          { title: 'My BooketList', icon: 'mdi-bookshelf', to: 'list' },
          { title: 'Show Favorite Book', icon: 'mdi-book-open-page-variant', to: 'show' },
          { title: 'Logout', icon: 'mdi-logout-variant', to: 'login' }
        ],
        drawer: null
      }
    },
  }
</script>
