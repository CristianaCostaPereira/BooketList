<template>
  <div class="container">
    <v-card
      class="login-main-card mx-auto"
      style="max-width: 1200px; min-height: 1020px; margin-top: 10px;">

      <div class="login-inputs px-4 py-3">
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
              required
              v-model="email">

              <div class="error" v-if="$v.email.$dirty && (!$v.email.required || !$v.email.email)">Must be a valid email address</div>
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
              v-model="password"
              required
              @keyup.enter="login()">

              <div class="error" v-if="$v.password.$dirty && (!$v.password.required || !$v.password.minLength)">Must be at least 3 characters long</div>
          </div>

          <div class="form-buttons">
           <button
              class="clear btn btn-primary mt-2"
              @click="resetForm()">

              Clear
            </button>

            <button
              class="sign-in btn btn-primary mt-2"
              :loading="isLoading"
              @click="login()">

              Sign in
            </button>

          </div>

            <router-link :to="{ name: 'Register' }">Register</router-link>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios')

import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',

  validations: {
    email: {
      required,
      email
    },

    password: {
      required,
      minLength: minLength(3)
    }
  },

  data () {
    return {
      email: 'cris@gmail.com',
      password: '123',
      isLoading: false
    }
  },

  methods: {
    async login() {
      
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      let data = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await axios.post('http://localhost:3000/login', data)

        if (response.data.status === 'error') {
          this.$notify({
            title: response.data.status,
            text: response.data.message,
            type: response.data.status,
            duration: 2000,
            speed: 1000
          })
          return
        }

        // Se bem autenticada -> redirect para landing page
        // Actualizar o BE para devolver info do user
        window.localStorage.setItem('book-token', response.data.token) // Para armazenar o token sem o perder quando mudar a rota/componente
        window.localStorage.setItem('reader-info', JSON.stringify(response.data.reader)) // Para guardar a informação do reader

        this.$router.push({ name: 'BookSearch' })

      } catch (error) {
        console.error(error)
      }
    },

    resetForm() {
      console.log('reset')
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
  body {
    background-image: url('https://cdn.pixabay.com/photo/2017/02/07/09/02/wood-2045380_960_720.jpg');
    background-size: cover;
  }
  .login-main-card {
    background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/49ccf758592393.5a02159d4090a.jpg');
  }

  .form-layout {
    margin: 225px 40px 0px 0px;
  }

  .login-inputs {
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

  .form-buttons {
    width: 101%;
    display: flex;

  }

  .sign-in, .clear {
    border: solid 1px #8a653054;
    width: 50%;
    float: right;
    margin-right: 5px;
    background-color: #d5a334a1
  }

  .sign-in:hover, .clear:hover {
    background-color: #753f8cb5;
}

  input.form-control::placeholder {
    color: #bebcbca9;
  }
</style>