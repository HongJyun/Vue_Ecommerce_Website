<template>
  <div class="dashboard">
    <Navbar />
    <Alert />
    <div class="container-fluid mt-6 mt-md-0">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "../components/Dashboard_Navbar";
import Sidebar from "../components/Dashboard_Sidebar";
import Products from "../components/Dashboard_Products";
import Alert from "../components/AlertMessage";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Sidebar,
    Products,
    Alert
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/dashboard";
</style>