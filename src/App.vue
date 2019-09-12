<template>
  <div id="app">
    <router-view />
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Home from '@/views/Home.vue'
// import Shop from '@/views/Shop.vue'
// import MainNav from '@/components/MainNavBar'

export default {
  name: 'app',
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    // MainNav,
    // Home,
    // Shop
  }
}
</script>
<style lang="scss">
@import "./assets/scss/all.scss";
</style>
