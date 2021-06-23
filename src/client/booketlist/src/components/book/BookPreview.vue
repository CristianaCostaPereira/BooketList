<template>
  <div class="book-preview">
    <h1>Book preview</h1>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  // Child Component
  props: {
    googleApiId: {
      type: String,
      required: true
    },
  },
}
</script>