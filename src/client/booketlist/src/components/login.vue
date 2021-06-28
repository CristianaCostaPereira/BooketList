<template>
  <div class="container">
    <v-card
      class="login-main-card mx-auto"
      :elevation="24"
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
              required
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
              v-model="password"
              required
              @keyup.enter="login()">
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
        </div>
      </form>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Login',

  data () {
    return {
      email: 'cris@gmail.com',
      password: '123',
      isLoading: false
    }
  },

  methods: {
    async login() {
      console.log('login')
      let data = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await axios.post('http://localhost:3000/login', data)

        // Se bem autenticada -> redirect para dashboard
        // Actualizar o BE para devolver info do user
        window.localStorage.setItem('book-token', response.data.token) // Para armazenar o token sem o perder quando mudar a rota/componente
        window.localStorage.setItem('reader-info', JSON.stringify(response.data.reader))

        this.$router.push({ name: 'Dashboard' })

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