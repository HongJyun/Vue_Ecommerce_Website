<template>
  <div class="home">
    <MainNav />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import MainNav from '@/components/MainNavBar'
import MainFooter from '@/components/MainFooter'

export default {
  name: 'Home',
  components: {
    MainNav,
    MainFooter
  }
}
</script>
