<template>
  <div>
    <Alert />
    <section class="container itemDetail col-lg-8">
      <div class="row mt-5 justify-content-center">
        <div class="col-lg-6 mb-5">
          <div style="height:500px" class="bg-light">
            <img :src="product.imageUrl" class="w-100 h-100 object-fit-contain" alt />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between">
            <h3 class="d-lg-block m-0 mr-5">{{ product.title }}</h3>
            <button
              type="button"
              class="btn btn-outline-accent fav-button"
              :class="{isfavorite:checkFavorite}"
              @click.prevent="addToFavorite(product)"
            >
              <div class="item-stared-icon">
                <label class="ui-checked-display">
                  <input type="checkbox" class="ui-checkbox" />
                  <i class="material-icons" v-if="checkFavorite">favorite</i>
                  <i class="material-icons" v-else>favorite_border</i>
                </label>
                <span v-if="checkFavorite">已收藏</span>
                <span v-else>收藏</span>
              </div>
            </button>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-baseline">
            <div
              class="h5 text-accent font-weight-bold w-100"
              v-if="!product.price"
            >{{ product.origin_price | currency }}</div>
            <del class="text-muted mb-1" v-if="product.price">{{ product.origin_price | currency }}</del>
            <div
              class="h5 text-accent font-weight-bold"
              v-if="product.price"
            >{{ product.price | currency}}</div>
          </div>
          <span class="badge badge-secondary py-1 px-2">預購後3-14個工作天出貨</span>
          <select name class="form-control mt-3" v-model="product.num">
            <option value="0" disabled selected>--請選擇--</option>
            <option :value="num" v-for="num in 10" :key="num">選購 {{num}}</option>
          </select>
          <div class>
            <div class="text-muted text-nowrap mt-2" v-if="product.num > 0">
              小計
              <strong v-if="product.price">{{ product.num * product.price | currency }}</strong>
              <strong v-else>{{ product.num * product.origin_price | currency }}</strong>
              元
            </div>
            <button
              :disabled="!product.num"
              type="button"
              class="btn btn-primary d-block my-3"
              @click="addtoCart(product.id, product.num)"
            >加到購物車</button>
            <hr />
            <p class="text-muted">統一發票中獎另會通知並寄送紙本發票</p>
          </div>
        </div>
      </div>
      <div class="mt-5 product-desc">
        <h4>商品介紹</h4>
        <hr />
        <p class="mt-4">{{ product.description }}</p>
        <p class="mt-4">{{ product.content }}</p>
        <img :src="product.imageUrl" class="img-fluid d-block mx-auto" alt />
      </div>
      <div>
        <div class="text-muted my-7">
          <span class="badge badge-danger p-2 mb-2">▶▶下標前請特別注意</span>
          <ol>
            <li>因7-11每筆訂單有材積限制(45*30*30的箱裝)，若超過材積這邊會告知之後拆單出貨，若大量購買請與客服先聯繫確認，減少你的訂單處理時效，降低你的商品延誤出貨。</li>
            <li>若同筆訂單有不同出貨時間，以【較晚】出貨的時間為主，請購買前評估是否分開下訂</li>
            <li>若多天沒有收到回應，建議你多更換幾個窗口聯繫我們，以免系統漏訊造成雙方的權益損失。</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Alert from '../components/AlertMessage'

export default {
  name: 'Shop',
  data () {
    return {
      id: '',
      product: {},
      fullPage: true,
      favPproducts: []
    }
  },
  computed: {
    checkFavorite () {
      const vm = this
      return vm.favPproducts.some(data => {
        return data.id === vm.product.id
      })
    }
  },
  methods: {
    getProduct (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(res => {
        vm.product = res.data.product
        vm.product.num = 0
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addtoCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      const cart = {
        product_id: id,
        qty
      }
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(api, { data: cart }).then(res => {
        if (res.data.success) {
          this.$bus.$emit('message:push', res.data.message, 'success')
          this.$bus.$emit('updateCartQty')
        } else {
          this.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(res => {
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addToFavorite (item) {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      let index = -1
      vm.favPproducts.forEach(data => {
        // console.log(data.title, item.title)
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
        vm.$store.dispatch('updateLoading', false)
      }, 300)
    },
    getFavList () {
      this.favPproducts =
        JSON.parse(localStorage.getItem('favProductsStrData')) || []
    }
  },
  components: {
    Alert
  },
  created () {
    const vm = this
    vm.id = this.$route.params.itemId
    this.getProduct(vm.id)
    this.getFavList()
  },
  watch: {
    $route (now) {
      const vm = this
      vm.id = this.$route.params.itemId
      this.getProduct(vm.id)
    }
  }
}
</script>
