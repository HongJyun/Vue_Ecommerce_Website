<template>
  <div class="dashboard">
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <Products />
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "../components/Dashboard_Navbar";
import Sidebar from "../components/Dashboard_Sidebar";
import Products from "../components/Dashboard_Products";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Sidebar,
    Products
  }
};
</script>
