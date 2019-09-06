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
          <p class="lead text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>
    </section>

    <section>
      <!-- Modal -->
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="product.imageUrl" class="img-fluid" alt />
              <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ product.content }}</p>
                <!-- <footer class="blockquote-footer text-right">{{ product.description }}</footer> -->
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
              </div>
              <select name class="form-control mt-3" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
              </select>
            </div>
            <div class="modal-footer">
              <div class="text-muted text-nowrap mr-3" v-if="product.num > 0">
                小計
                <strong>{{ product.num * product.price }}</strong> 元
              </div>
              <button
                :disabled="!product.num"
                type="button"
                class="btn btn-primary"
                @click="addtoCart(product.id, product.num)"
              >加到購物車</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MainContent -->
      <!-- SideBar -->
      <div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
        <div class="row">
          <aside class="col-lg-4 col-xl-2 text-center">
            <h2 class="bg-primary font-weight-bold h4 text-white mb-0 py-3">Categories</h2>
            <div class="list-group" id="Categories">
              <a href="#" class="list-group-item list-group-item-action h4 font-weight-bold">Tech</a>
              <a href="#" class="list-group-item list-group-item-action h4 font-weight-bold">Game</a>
              <a href="#" class="list-group-item list-group-item-action h4 font-weight-bold">Outdoor</a>
              <a
                href="#"
                class="list-group-item list-group-item-action h4 font-weight-bold"
              >Accessory</a>
            </div>
          </aside>
          <!-- Products -->
          <main class="col-lg-8 col-xl-10">
            <div class="row">
              <div
                class="col-12 col-md-6 col-xl-4 mb-4 mb-sm-4"
                v-for="item in filterdProducts"
                :key="item.id"
              >
                <div class="card">
                  <a href="javascript:;" class="img-wrapper" @click="getProduct(item.id)">
                    <div class="item-img" :style="{backgroundImage : `url(${item.imageUrl})`}"></div>
                  </a>
                  <div class="item-tag">{{ item.category }}</div>
                  <!-- <div class="item-stared-icon">
                    <label class="ui-checked-display">
                      <input type="checkbox" class="ui-checkbox" />
                      <i class="material-icons ui-show">favorite</i>
                      <i class="material-icons ui-hidden">favorite_border</i>
                    </label>
                  </div>-->
                  <div class="item-info d-flex text-center text-nowrap">
                    <h3 class="item-title col">{{ item.title }}</h3>
                  </div>
                  <div class="item-info d-flex text-center text-wrap">
                    <span class="origin-price col">原價：{{ item.price | currency }}</span>
                    <h3 class="item-price col">
                      現時優惠
                      <span class="text-accent font-weight-bold">{{ item.price | currency }}</span>
                    </h3>
                  </div>
                  <a
                    @click.prevent="addtoCart(item.id)"
                    href
                    class="btn-lg btn-light btn btn-block text-primary font-weight-bold"
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
import $ from "jquery";
import Pagination from "../components/Pagination";
import Alert from "../components/AlertMessage";

export default {
  name: "Shop",
  data() {
    return {
      products: [],
      product: {},
      pagination: {
        category: null,
        current_page: 1,
        has_next: false,
        has_pre: false,
        total_pages: 1
      },
      filterKeyword: "all",
      isLoading: false,
      fullPage: true
    };
  },
  computed: {
    filterdProducts() {
      const vm = this;
      if (vm.filterKeyword === "all") {
        return vm.products;
      } else {
        return vm.products.filter(
          product => product.category === vm.filterKeyword
        );
      }
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        vm.products = res.data.products;
        vm.isLoading = false;
        vm.pagination = res.data.pagination;
      });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        vm.product = res.data.product;
        vm.isLoading = false;
        $("#productModal").modal("show");
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
        console.log(res);
        if (res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "success");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
        $("#productModal").modal("hide");
        vm.getCart();
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
    Pagination,
    Alert
  },
  created() {
    this.getProducts();
  },
  mounted() {
    const vm = this;
    document.querySelector("#Categories").addEventListener("click", e => {
      vm.filterKeyword = e.target.textContent;
    });
  }
};
</script>