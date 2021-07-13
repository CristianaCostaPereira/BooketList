<template>
  <div>
    <notifications/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // ter pedido ao BE para validar o token e returnar o reader e se falhar reencaminhar para o login

}
</script>

<style lang="scss">
  .vue-notification-group {
    top: 70px !important;
  }
</style>