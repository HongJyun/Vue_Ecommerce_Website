<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light py-0">
      <button
        class="navbar-toggler d-flex d-md-none align-items-center"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/about" class="navbar-brand" href="#">Tech gadgets</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto font-weight-bold">
          <li class="nav-item" :class="{active: this.$route.name == 'about'}">
            <router-link class="nav-link" to="/about">首頁</router-link>
            <span class="sr-only">首頁</span>
          </li>
          <li class="nav-item" :class="{active: this.$route.name == 'shop'}">
            <router-link class="nav-link" to="/shop">商品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{active: this.$route.name == 'admin'}"
              to="/admin/products"
            >後臺管理</router-link>
            <span class="sr-only">後臺管理</span>
          </li>
        </ul>
      </div>
      <router-link
        to="/checkout"
        class="nav-link d-flex align-items-center"
        :class="{active: this.$route.name == 'checkout'}"
        href="#"
        tabindex="-1"
      >
        <i class="material-icons">shopping_cart</i>
        <span class="badge badge-secondary">{{ this.cartQty }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      cartQty: null
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log("nav", res.data);
        vm.isLoading = false;
        vm.cartQty = res.data.data.carts.length;
      });
    }
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on("updateCartQty", () => {
      vm.getCart();
    });
  }
};
</script>
