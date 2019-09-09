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
      <router-link to="/about" class="navbar-brand" href="#">皮客幫</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto font-weight-bold">
          <li class="nav-item" :class="{active: this.$route.name == 'about'}">
            <router-link class="nav-link" to="/about">首頁</router-link>
            <span class="sr-only">首頁</span>
          </li>
          <li class="nav-item" :class="{active: this.$route.name == 'shop'}">
            <router-link class="nav-link" to="/shop">商品列表</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:;"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >我的最愛</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div v-if="favPproducts.length != 0" class style="min-width: 200px;">
                <h5 class="text-white text-center">我的最愛</h5>
                <div v-for="item in favPproducts" :key="item.id" class="w-100">
                  <router-link
                    :to="{ name: 'itempage',
                params: {itemId: `${ item.id }`}
                }"
                    class="text-center border-top pt-2 dropdown-item"
                  >{{ item.title }}</router-link>
                </div>
              </div>
              <div class="dropdown-item text-center" v-else>我的最愛是空的</div>
            </div>
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
// import { setTimeout } from 'timers'
export default {
  name: 'Nav',
  data () {
    return {
      cartQty: null,
      favPproducts: JSON.parse(localStorage.getItem('favProductsStrData')) || []
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(res => {
        console.log('nav', res.data)
        vm.isLoading = false
        vm.cartQty = res.data.data.carts.length
      })
    },
    getFavList () {
      this.favPproducts =
        JSON.parse(localStorage.getItem('favProductsStrData')) || []
    }
  },
  created () {
    const vm = this
    vm.getCart()
    vm.$bus.$on('updateCartQty', () => {
      vm.getCart()
    })
    vm.$bus.$on('emitGetFav', () => {
      vm.getFavList()
    })
  }
}
</script>
