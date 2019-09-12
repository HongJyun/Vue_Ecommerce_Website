<template>
  <section class="container">
    <h4 class="bg-light py-3 font-weight-bold text-center mb-5">您的購物車</h4>
    <div class="cart" v-for="item in carts" :key="item.id">
      <div class="cart-row">
        <div class="d-flex align-items-center flex-fill">
          <div
            v-if="item.product_id"
            class="cart-img"
            :style="{backgroundImage : `url(${item.product.imageUrl})`}"
          ></div>
          <div class="cart-itemInfo">
            <div>
              <span class="cart-itemInfo-title h5 font-weight-bold">{{ item.product.title }}</span>
              <br />
              <span class="cart-itemInfo-price">{{ item.product.price | currency }}</span>
            </div>
            <div class="cart-quantity">購買數量: {{ item.qty }}</div>
          </div>
        </div>
        <button
          @click="deleteCart(item.id)"
          type="button"
          class="btn material-icons del-btn d-md-none"
          :disabled="$store.state.isLoading === true"
        >delete_outline</button>
      </div>
      <div class="w-md-25 d-md-flex align-items-center justify-content-around">
        <div class="cart-price flex-fill">{{ item.total | currency }}</div>
        <button
          @click="deleteCart(item.id)"
          type="button"
          class="btn material-icons del-btn d-none d-md-block"
          :disabled="$store.state.isLoading === true"
        >delete_outline</button>
      </div>
    </div>

    <div class="row">
      <div class="col mt-5 mt-lg-0">
        <div class="pb-3 bg-md-primary">
          <h2
            class="py-3 mb-3 text-center text-white text-md-down-primary h4 border-bottom bg-sm-light"
          >訂單摘要</h2>

          <div class="px-3 text-white text-md-down-primary">
            <div class="d-flex justify-content-between">
              <span>小計</span>
              <span
                :style="{textDecoration: total !== finalTotal ? 'line-through':''}"
                v-if="carts"
              >{{ total | currency }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>折扣金額</span>
              <span v-if="total !== finalTotal">{{ total - finalTotal | currency }}</span>
              <span v-else>0</span>
            </div>
            <div class="d-flex justify-content-between h5 font-weight-bold mt-3">
              <span>總計</span>
              <span v-if="carts">{{ finalTotal | currency }}</span>
            </div>
          </div>
        </div>

        <router-link
          to="/checkout/order"
          class="btn btn-accent btn-block rounded-0 btn-lg py-3 text-primary btn-lg-font font-weight-bold"
        >結帳</router-link>
        <div class="mb-5" v-if="total !== finalTotal">目前已套用折價券</div>

        <div class="input-group input-group form-square mt-3">
          <input
            @submit="applyCoupon"
            type="text"
            class="form-control border-primary"
            v-model="couponCode"
            placeholder="請輸入優惠碼"
            name="coupon"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="applyCoupon">套用優惠碼</button>
          </div>
        </div>
        <div class="alertMsg mb-5">
          <span class="text-danger" v-if="errors.has('coupon')">請輸入折價券</span>
          <span class="couponRes"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      carts: [],
      total: '',
      finalTotal: '',
      couponCode: '',
      fullPage: true
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      vm.$store.dispatch('updateLoading', true)

      this.$http.get(api).then(res => {
        vm.$store.dispatch('updateLoading', false)
        vm.carts = res.data.data.carts
        vm.total = res.data.data.total
        vm.finalTotal = res.data.data.final_total
      })
    },
    deleteCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.delete(api).then(res => {
        vm.$bus.$emit('updateCartQty')
        vm.$store.dispatch('updateLoading', false)
        vm.getCart()
      })
    },
    applyCoupon () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const coupon = {
        code: vm.couponCode
      }

      this.$http.post(api, { data: coupon }).then(res => {
        console.log(res.data)
        document.querySelector('.couponRes').textContent = res.data.message
        this.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
