<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
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
