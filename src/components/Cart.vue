<template>
  <section class="container px-0 px-lg-2">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="row no-gutters">
      <div class="col pr-lg-2">
        <h4 class="bg-light py-3 font-weight-bold text-center mb-5">您的購物車</h4>
        <div class="cart">
          <div class="cart-row d-lg-flex pb-lg-4 mb-4" v-for="item in carts" :key="item.id">
            <div
              class="d-flex flex-fill col flex-lg-row align-items-lg-center justify-content-between px-5 px-lg-0 text-nowrap"
            >
              <div>
                <div
                  v-if="item.product_id"
                  class="cart-img cart-img-sm"
                  :style="{backgroundImage : `url(${item.product.imageUrl})`}"
                ></div>
              </div>
              <div
                class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center flex-fill ml-3"
              >
                <div class="cart-item mb-2 mx-lg-5 mb-lg-0">
                  <span class="cart-item-title h5 font-weight-bold">{{ item.product.title }}</span>
                  <br />
                  <span class="cart-item-price">{{ item.product.price | currency }}</span>
                </div>
                <div class="cart-quantity">
                  <div class="input-group carts-input-group">
                    <div class="font-weight-bold h5 m-0">購買數量: {{ item.qty }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-fill col-4 align-items-center d-flex ml-auto">
              <div
                class="cart-price justify-content-end flex-fill mx-5 mt-2 mt-lg-0 mb-0 py-3 h5 font-weight-bold text-center"
              >{{ item.total | currency }}</div>
              <button
                @click="deleteCart(item.id)"
                type="button"
                class="btn text-primary material-icons d-none d-lg-block"
              >delete_outline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col mt-5 mt-lg-0">
      <div class="px-3 pb-3 bg-md-primary">
        <h2
          class="py-3 mb-3 text-center text-white text-md-down-primary h4 border-bottom bg-sm-light"
        >訂單摘要</h2>

        <div class="text-white text-md-down-primary">
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
      <div class='mb-5' v-if="total !== finalTotal">目前已套用折價券</div>

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
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      vm.isLoading = true

      this.$http.get(api).then(res => {
        vm.isLoading = false
        vm.carts = res.data.data.carts
        vm.total = res.data.data.total
        vm.finalTotal = res.data.data.final_total
      })
    },
    deleteCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      const vm = this
      vm.isLoading = true
      this.$http.delete(api).then(res => {
        vm.$bus.$emit('updateCartQty')
        vm.isLoading = false
        vm.getCart()
      })
    },
    applyCoupon () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
      const vm = this
      vm.isLoading = true
      const coupon = {
        code: vm.couponCode
      }

      this.$http.post(api, { data: coupon }).then(res => {
        console.log(res.data)
        document.querySelector('.couponRes').textContent = res.data.message
        this.getCart()
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
