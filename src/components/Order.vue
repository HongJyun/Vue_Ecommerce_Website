<template>
  <section class="container px-0">
    <div class="row col-md-8 mx-auto no-gutters px-0">
      <div class="col">
        <div class="px-5 pb-3 bg-primary">
          <div class="d-flex">
            <div class="col-6">
              <h1 class="py-3 mb-3 text-white bg-primary">付款</h1>
            </div>
            <div class="col-6 d-flex align-items-center">
              <div class="process-steps w-100">
                <div class="step-circle material-icons completed"></div>
                <div class="step-circle material-icons active"></div>
                <div class="step-circle material-icons"></div>
              </div>
            </div>
          </div>

          <form class="text-white">
            <label class="h5 font-weight-bold" for="useremail">Email*</label>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                placeholder="請輸入 Email"
                v-model="form.user.email"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-row">
              <label class="col-12 h5 font-weight-bold" for="username">收件人姓名*</label>
              <div class="form-group col">
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="username"
                  placeholder="輸入姓名"
                  v-model="form.user.name"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
              </div>
            </div>
            <div class="form-row">
              <label class="col-12 h5 font-weight-bold" for="usertel">收件人電話</label>
              <div class="form-group col">
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  placeholder="請輸入電話"
                  v-model="form.user.tel"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col">
                <label class="h5 font-weight-bold" for="useraddress">收件人地址*</label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  id="useraddress"
                  placeholder="請輸入地址"
                  v-model="form.user.address"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label class="h5 font-weight-bold" for="comment">留言</label>
                <textarea
                  name
                  id="comment"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <button
          @click="createOrder"
          class="btn btn-accent btn-block rounded-0 btn-lg py-3 text-primary btn-lg-font font-weight-bold"
        >送出訂單</button>
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
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
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
    },
    createOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const vm = this;
      vm.isLoading = true;
      const order = vm.form;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(res => {
            console.log("create", res);
            console.log("id", res.data.orderId);
            if (res.data.success) {
              vm.$router.push(`/checkout/order_check/${res.data.orderId}`);
            } else {
              console.log("id", res.data);
            }
          });
        } else {
          console.log("欄位不完整");
        }
      });
      vm.isLoading = false;

      this.getCart();
    }
  },
  created() {
    this.getCart();
  }
};
</script>
