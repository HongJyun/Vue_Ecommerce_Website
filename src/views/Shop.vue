<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
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
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      placeholder="請輸入圖片連結"
                      v-model="product.imageUrl"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile">
                      或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" ref="files" />
                  </div>
                  <img class="img-fluid" :src="product.imageUrl" alt />
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      v-model="product.title"
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        v-model="product.category"
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        v-model="product.unit"
                        type="unit"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位"
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        v-model="product.origin_price"
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入原價"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        v-model="product.price"
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      v-model="product.description"
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      v-model="product.content"
                      type="text"
                      class="form-control"
                      id="content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        v-model="product.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary">確認</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
        <div class="row">
          <aside class="col-lg-4 col-xl-2 text-center">
            <h2 class="bg-primary font-weight-bold h4 text-white mb-0 py-3">甜點類別</h2>
            <div class="list-group">
              <a
                href="#"
                class="list-group-item list-group-item-action h4 font-weight-bold active"
              >所有甜點（48）</a>
              <a
                href="#"
                class="list-group-item list-group-item-action h4 font-weight-bold"
              >本日精選（10）</a>
              <a
                href="#"
                class="list-group-item list-group-item-action h4 font-weight-bold"
              >人氣推薦（26）</a>
              <a
                href="#"
                class="list-group-item list-group-item-action h4 font-weight-bold"
              >新品上市（12）</a>
            </div>
          </aside>
          <!-- Products -->
          <main class="col-lg-8 col-xl-10">
            <div class="row">
              <div
                class="col col-md-6 col-xl-4 mb-4 mb-sm-4"
                v-for="item in products"
                :key="item.id"
              >
                <div class="card">
                  <a href="#" class="img-wrapper" @click="getProduct(item.id)">
                    <div class="item-img" :style="{backgroundImage : `url(${item.imageUrl})`}"></div>
                  </a>
                  <div class="item-tag">{{ item.category }}</div>
                  <div class="item-stared-icon">
                    <label class="ui-checked-display">
                      <input type="checkbox" class="ui-checkbox" />
                      <i class="material-icons ui-show">favorite</i>
                      <i class="material-icons ui-hidden">favorite_border</i>
                    </label>
                  </div>
                  <div class="item-info d-flex text-center text-nowrap">
                    <h3 class="item-title col">{{ item.title }}</h3>
                  </div>
                  <div class="item-info d-flex text-center text-nowrap">
                    <span class="origin-price col">原價：{{ item.price | currency }}</span>
                    <h3 class="item-price col">
                      現時優惠
                      <span class="text-accent font-weight-bold">{{ item.price | currency }}</span>
                    </h3>
                  </div>
                  <a
                    href="#"
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

export default {
  name: "Shop",
  data() {
    return {
      products: [],
      product: {},
      pagination: {},
      isLoading: false,
      fullPage: true
    };
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
      console.log(api);
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log(res);
        vm.product = res.data.product;
        vm.isLoading = false;
        $("#productModal").modal('show');
      });
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getProducts();
  }
};
</script>