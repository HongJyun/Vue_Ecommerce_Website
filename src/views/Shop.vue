<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <Alert />

    <section class="hero">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">商品列表</h1>
        </div>
      </div>
    </section>

    <section>
      <!-- MainContent -->
      <!-- SideBar -->
      <div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
        <div class="row">
          <aside class="col-lg-4 col-xl-2 text-center">
            <h2 class="bg-primary font-weight-bold h4 text-white mb-0 py-3">Categories</h2>
            <div class="list-group" id="Categories" v-for="cat in categories" :key="cat">
              <router-link
                :to="{ name: 'shop',
                params: {category: `${ cat }`}
                }"
                class="list-group-item list-group-item-action h4 font-weight-bold"
                :class="{'active': filterKeyword === cat}"
              >{{ cat }}</router-link>
            </div>
          </aside>
          <!-- Products -->
          <main class="col-lg-8 col-xl-10 mt-5 mt-md-0">
            <div class="row">
              <div
                class="col-12 col-md-6 col-xl-4 mb-4 mb-sm-4"
                v-for="item in filterdProducts"
                :key="item.id"
              >
                <div class="item-card">
                  <a
                    href="javascript:;"
                    class="img-wrapper item-border border-bottom-0"
                    @click="getProduct(item.id)"
                  >
                    <div class="item-img" :style="{backgroundImage : `url(${item.imageUrl})`}"></div>
                  </a>
                  <div class="item-tag">{{ item.category }}</div>
                  <div class="item-stared-icon">
                    <label class="ui-checked-display" @click.prevent="addToFavorite(item)">
                      <input type="checkbox" class="ui-checkbox" />
                      <i class="material-icons" v-if="item.is_favorite">favorite</i>
                      <i class="material-icons" v-else>favorite_border</i>
                    </label>
                  </div>
                  <h3 class="item-title item-border col">{{ item.title }}</h3>
                  <div class="item-border d-flex text-wrap">
                    <span
                      v-if="item.price != item.origin_price"
                      class="origin-price col"
                    >{{ item.origin_price | currency }}</span>
                    <h3 v-if="item.price" class="item-price col">{{ item.price | currency }}</h3>
                    <h3 v-else class="item-price col">{{ item.origin_price | currency }}</h3>
                  </div>
                  <a
                    @click.prevent="addtoCart(item.id)"
                    href="javascript:;"
                    class="btn-lg btn-light btn btn-block text-primary font-weight-bold"
                    :disabled="isLoading === true"
                  >加入購物車</a>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <Pagination :pages="pagination" @emitPagination="getProducts" />
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from '../components/Pagination'
import Alert from '../components/AlertMessage'
import { setTimeout } from 'timers'

export default {
  name: 'Shop',
  data () {
    return {
      products: [],
      favPproducts: [],
      is_favorite: false,
      pagination: {},
      filterKeyword: 'all',
      isLoading: false,
      fullPage: true,
      categories: [
        'all',
        '斜肩背包',
        '公事包',
        '托特包',
        '後背包',
        '皮夾',
        '皮革配件'
      ]
    }
  },
  computed: {
    filterdProducts () {
      const vm = this
      let newProducts = vm.products
      newProducts.map(product => {
        product.is_favorite = vm.favPproducts.some(data => {
          return data.id === product.id
        })
      })

      if (vm.filterKeyword === 'all') {
        return newProducts
      } else {
        return newProducts.filter(
          product =>
            product.category.toLowerCase() === vm.filterKeyword.toLowerCase()
        )
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(res => {
        vm.products = res.data.products
        vm.isLoading = false
        vm.pagination = res.data.pagination
      })
    },
    getProduct (id) {
      console.log(id)
      this.$router.push(`/itempage/${id}`)
    },
    addtoCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      const cart = {
        product_id: id,
        qty
      }

      vm.isLoading = true
      this.$http.post(api, { data: cart }).then(res => {
        console.log(api)
        if (res.data.success) {
          this.$bus.$emit('message:push', res.data.message, 'success')
          this.$bus.$emit('updateCartQty')
        } else {
          this.$bus.$emit('message:push', res.data.message, 'danger')
        }
        setTimeout(() => {
          vm.isLoading = false
        }, 300)
      })
    },

    addToFavorite (item) {
      const vm = this
      vm.isLoading = true

      let index = -1
      vm.favPproducts.forEach(data => {
        if (data.id === item.id) {
          index = vm.favPproducts.indexOf(data)
          vm.favPproducts.splice(index, 1)
          localStorage.setItem(
            'favProductsStrData',
            JSON.stringify(vm.favPproducts)
          )
          this.$bus.$emit('message:push', '已從我的最愛移除', 'danger')
        }
      })
      if (index < 0) {
        vm.favPproducts.push(item)
        localStorage.setItem(
          'favProductsStrData',
          JSON.stringify(vm.favPproducts)
        )
        this.$bus.$emit('message:push', '已加入我的最愛', 'success')
      }
      this.getFavList()
      this.$bus.$emit('emitGetFav')
      setTimeout(() => {
        vm.isLoading = false
      }, 300)
    },
    getFavList () {
      this.favPproducts =
        JSON.parse(localStorage.getItem('favProductsStrData')) || []
    }
  },
  components: {
    Pagination,
    Alert
  },
  created () {
    this.getProducts()
    this.getFavList()
  },
  mounted () {
    const vm = this
    let category = this.$route.params.category
    vm.filterKeyword = category
  },
  watch: {
    $route (now) {
      let category = this.$route.params.category
      this.filterKeyword = category
    }
  }
}
</script>
