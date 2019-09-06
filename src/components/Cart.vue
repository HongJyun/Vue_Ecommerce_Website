<template>
  <section class="container px-0 px-md-2">
    <div class="row no-gutters">
      <div class="col pr-md-2">
        <h4 class="bg-light py-3 font-weight-bold text-center mb-5">您的購物車</h4>
        <div class="cart">
          <div class="cart-row d-md-flex pb-md-4 mb-4" v-for="item in carts" :key="item.id">
            <div
              class="d-flex flex-md-row align-items-md-center justify-content-between flex-fill px-5 px-md-0 text-nowrap"
            >
              <div>
                <div
                  v-if="item.product_id"
                  class="cart-img cart-img-sm"
                  :style="{backgroundImage : `url(${item.product.imageUrl})`}"
                ></div>
              </div>
              <div class="d-flex flex-column flex-md-row justify-content-around flex-fill ml-3">
                <div class="cart-item mb-2 mx-md-5 mb-md-0">
                  <span class="cart-item-title h5">{{ item.product.title | currency }}</span>
                  <br />
                  <span class="cart-item-price">{{ item.product.price | currency }}</span>
                </div>
                <div class="cart-quantity">
                  <div class="input-group carts-input-group">
                    <div class="input-group-prepend">
                      <button type="button" class="btn text-primary material-icons">remove</button>
                    </div>
                    <input type="text" class="form-control" :value="item.product.num" maxlength="2" />
                    <div class="input-group-append">
                      <button type="button" class="btn text-primary material-icons">add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-fill align-items-center d-flex justify-content-between">
              <div
                class="cart-price justify-content-end flex-fill mx-5 mt-2 mt-md-0 mb-0 py-3 h5 font-weight-bold text-nowrap text-md-center text-right"
              >{{ item.total | currency }}</div>
              <button
                @click="deleteCart(item.id)"
                type="button"
                class="btn text-primary material-icons d-none d-md-block"
              >delete_outline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col mt-5 mt-md-0">
      <div class="mx-3 mx-md-0 px-3 pb-3 bg-md-primary">
        <h2
          class="py-3 mb-3 text-center text-white text-md-down-primary h4 border-bottom bg-sm-light"
        >訂單摘要</h2>

        <div class="text-white text-md-down-primary">
          <div class="d-flex justify-content-between">
            <span>小計</span>
            <span v-if="carts">{{ total | currency }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>折扣</span>
            <span></span>
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
      <div class="input-group mb-3 input-group form-square mt-3">
        <input
          type="text"
          class="form-control border-primary"
          v-model="couponCode"
          placeholder="請輸入優惠碼"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="applyCoupon">套用優惠碼</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      carts: [],
      total: "",
      finalTotal: "",
      couponCode: ""
    };
  },
  // computed: {
  //   prepostOrder() {

  //     let order = this.carts.map(item=>item.product)
  //     return order;
  //   }
  // },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log("nav", res.data);
        vm.isLoading = false;
        vm.carts = res.data.data.carts;
        vm.total = res.data.data.total;
        vm.finalTotal = res.data.data.final_total;
        if (vm.carts[0]) {
          vm.$set(vm.carts[0], "", res.data.data.carts[0]);
        }
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(res => {
        console.log("del", res);
        vm.isLoading = false;
      });
      this.getCart();
    },
    applyCoupon() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const vm = this;
      vm.isLoading = true;
      const coupon = {
        content: vm.couponCode
      };
      this.$http.post(api, { data: coupon }).then(res => {
        console.log("coupon", res);
        vm.isLoading = false;
      });
      this.getCart();
    }
  },
  created() {
    this.getCart();
  }
};
</script>
