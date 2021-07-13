<template>
  <div class="container">
    <v-card
      class="register-main-card mx-auto"
      style="min-height: 730px; margin-top: 100px;">

      <div class="register-inputs">
        <h1>Register</h1>

        <div class="form-layout">
          <div class="mb-3">
            <label
              for="first-name"
              class="form-label mb-1">

              First Name
            </label>

            <input
              type="text"
              class="form-control"
              id="first-name"
              required
              v-model="firstName">

              <div class="error" v-if="$v.firstName.$dirty && (!$v.firstName.required || !$v.firstName.minLength || !$v.firstName.maxLength)">Must be between 3 and 45 characters long</div>
          </div>

          <div class="mb-3">
            <label
              for="last-name"
              class="form-label mt-3 mb-1">

              Last Name
            </label>

            <input
              type="text"
              class="form-control"
              id="last-name"
              v-model="lastName"
              required
              @keyup.enter="register()">

              <div class="error" v-if="$v.lastName.$dirty && (!$v.lastName.required || !$v.lastName.minLength || !$v.lastName.maxLength)">Must be between 3 and 45 characters long</div>
          </div>

          <div class="mb-3">
            <label
              for="email"
              class="form-label mt-3 mb-1">

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
              class="form-label mt-3 mb-1">

              Password
            </label>

            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              required
              @keyup.enter="register()">

              <div class="error" v-if="$v.password.$dirty && (!$v.password.required || !$v.password.minLength)">Must be at least 3 characters long</div>
          </div>

          <div class="mb-3">
            <label
              for="confirm-password"
              class="form-label mt-3 mb-1">

              Confirm Password
            </label>

            <input
              type="password"
              class="form-control"
              id="confirm-password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              required
              @keyup.enter="register()">

              <div class="error" v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">Must match with password</div>
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
              @click="register()">

              Register
            </button>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios')

import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Register',

  validations: {
    firstName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(45)
    },

    lastName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(45)
    },

    email: {
      required,
      email
    },

    password: {
      required,
      minLength: minLength(3)
    },

    confirmPassword: {
      required,
      minLength: minLength(3),
      sameAsPassword: sameAs('password')
    }
  },

  data () {
    return {
      firstName: '',
      lastName: '',
      email: 'cris@gmail.com',
      password: '123',
      confirmPassword: '',
      isLoading: false
    }
  },

  methods: {
    async register() {

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.confirmPassword,
      }

      try {
        const response = await axios.post('http://localhost:3000/register', data)

        if (response.data.status === 'success') {
          this.$notify({
            title: response.data.status,
            text: response.data.message,
            type: response.data.status,
            duration: 2000,
            speed: 1000
          })
          return
        }

        this.$router.push({ name: 'Login' })

      } catch (error) {
        console.error(error)
      }
    },

    resetForm() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}
</script>

<style>
  body {
    background-image: url('https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_960_720.jpg');
    background-size: cover;
  }

  .register-main-card {
    background-image: url('https://i.pinimg.com/originals/ea/69/a4/ea69a45d5dc77fd29c7e3730f31f4f0c.jpg');
  }

  h1 {
    padding-top: 46px;
    color: #cab366;
  }

  .form-layout {
    margin: 30px 100px 0px 0px;
  }

  .register-inputs {
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