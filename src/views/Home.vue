<template>
  <div class="home">
    <MainNav />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import About from "@/views/About.vue";
import Shop from "@/views/Shop.vue";
import MainNav from "@/components/MainNavBar";
import MainFooter from "@/components/MainFooter";

export default {
  name: "Home",
  components: {
    MainNav,
    About,
    Shop,
    MainFooter
  },
};
</script>
