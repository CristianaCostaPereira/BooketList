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
              @click="$refs.form.reset()">

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

    <!-- Second option for login layout -->
    <!-- DO NOT forget to pass remove the inline style!!! -->
    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 10px">

      <v-form
        ref="form"
        v-model="form"
        class="pa-4 pt-6">

        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="Email address">
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
      </v-form>

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
        window.localStorage.setItem('book-token', response.data.token) // Para armazenar o token sem o perder quando mudar a rota/componente
        window.localStorage.setItem('reader-info', JSON.stringify(response.data.reader))

        this.$router.push({ name: 'Dashboard' })

      } catch (error) {
        console.error(error)
      }
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