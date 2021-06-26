<template>
  <div class="container">
    <v-card
      class="login-main-card mx-auto"
      style="max-width: 1200px; min-height: 1050px; margin-top: 10px;">

      <form
        class="px-4 py-3"
        @submit.prevent>

        <div class="form-layout">
          <div class="mb-3">
            <label
              for="email"
              class="form-label mb-1">

              Email Address
            </label>

            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="email@example.com"
              v-model="email">
          </div>

          <div class="mb-3">
            <label
              for="password"
              class="form-label mt-4 mb-1">

              Password
            </label>

            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password">
          </div>

          <button
            class="sign-in btn btn-primary mt-2"
            @click="login()">

            Sign in
          </button>
        </div>
      </form>
    </v-card>

    <!-- Second option for login layout -->
    <!-- DO NOT forget to pass remove the inline style!!! -->
    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 10px">

      <v-toolbar
        src="@/assets/book3.jpg"
        cards
        dark
        flat>

        <v-card-title class="text-h5 font-weight-regular">
          Sign In
        </v-card-title>
      </v-toolbar>

      <v-form
        ref="form"
        v-model="form"
        class="pa-4 pt-6">

        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="Email address"
          type="email">
        </v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        >
        </v-text-field>

        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="deep-purple">

          <template v-slot:label>
            I agree to the&nbsp;

            <a
              href="#"
              @click.stop.prevent="dialog = true">

              Terms of Service
            </a>

            &nbsp;and&nbsp;

            <a
              href="#"
              @click.stop.prevent="dialog = true">

              Privacy Policy
            </a>*
          </template>
        </v-checkbox>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          text
          @click="$refs.form.reset()">

          Clear
        </v-btn>

        <v-btn
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="deep-purple accent-4"
          depressed>

          Submit
        </v-btn>
      </v-card-actions>

      <v-dialog
        v-model="dialog"
        absolute
        max-width="400"
        persistent>

        <v-card>
          <v-card-title
            class="text-h5 grey lighten-3"
            src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">

            Legal
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text
              @click="agreement = false, dialog = false">

              No
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              class="white--text"
              color="deep-purple accent-4"
              @click="agreement = true, dialog = false">

              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Login',

  data () {
    return {
      password: '',
      email: '',


      agreement: false,
      dialog: false,
      form: false,
      isLoading: false,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }
  },

  methods: {
    async login() {
      let data = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await axios.post('http://localhost:3000/login', data)

        // Se bem autenticada -> redirect para dashboard
        // Actualizar o BE para devolver info do user
        debugger

        window.localStorage.setItem('book-token', response.data.token) // Para armazenar o token sem o perder quando mudar a rota/componente
        window.localStorage.setItem('reader-info', response.data.reader)

      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
  .login-main-card {
    background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/49ccf758592393.5a02159d4090a.jpg');
  }

  .form-layout {
    margin: 240px 55px 0px 0px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    float: right;
  }

  .form-label {
    font-weight: 700;
  }

  .form-control {
    width: 100%;
    float: right;
  }

  .sign-in {
    border: solid 2px #8a653054;
    width: 100%;
    float: right;
    background-color: #d5a334a1;
  }

  input.form-control::placeholder {
    color: #bebcbca9;
  }
</style>