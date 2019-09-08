<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <Alert />
    <section class="container col-lg-10">
      <div class="row mt-6 justify-content-center">
        <div class="col-lg-5">
          <div style="height:500px" class="bg-light">
            <img :src="product.imageUrl" class="w-100 h-100 object-fit-contain" alt />
          </div>
          <div class="mt-3">
            <h3 class="d-lg-none" id="exampleModalLabel">{{ product.title }}</h3>
            <p class="mt-4 d-lg-none">{{ product.description}}</p>
            <h4>商品介紹</h4>
            <hr>
            <p class="mt-4">{{ product.content  }}</p>
          </div>
        </div>
        <div class="col-lg-5">
          <div class>
            <h3 class="d-lg-block d-none">{{ product.title }}</h3>
            <hr>
            <p class="mt-4 d-lg-block d-none">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-baseline mt-5">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option value="0" disabled selected>--請選擇--</option>
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class>
            <div class="text-muted text-nowrap mr-3" v-if="product.num > 0">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              :disabled="!product.num"
              type="button"
              class="btn btn-primary w-100 my-3"
              @click="addtoCart(product.id, product.num)"
            >加到購物車</button>
            <hr />
            <p class="text-muted">付款後，備貨到寄出商品為 2~6 個工作天。（不包含假日）</p>
            <p class="text-muted">統一發票中獎另會通知並寄送紙本發票</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Alert from "../components/AlertMessage";

export default {
  name: "Shop",
  data() {
    return {
      id: "",
      product: {},
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        vm.product = res.data.product;
        vm.product.num = 0;
        vm.isLoading = false;
        console.log(vm.product);
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };

      vm.isLoading = true;
      this.$http.post(api, { data: cart }).then(res => {
        if (res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "success");
          this.$bus.$emit("updateCartQty");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.getCart();
        vm.isLoading = false;
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log("res", res.data);
        vm.isLoading = false;
      });
    }
  },
  components: {
    Alert
  },
  created() {
    const vm = this;
    vm.id = this.$route.params.itemId;
    this.getProduct(vm.id);
  }
};
</script>