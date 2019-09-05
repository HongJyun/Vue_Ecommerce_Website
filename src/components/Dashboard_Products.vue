<template>
  <div>
    <div class="text-right">
      <button class="btn btn-outline-primary mb-2" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td style="max-width:120px">
            <button class="btn btn-sm btn-outline-primary mr-2" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-sm btn-outline-primary" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
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
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    @change="uploadFile"
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    v-model="tempProduct.title"
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
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      v-model="tempProduct.unit"
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
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      v-model="tempProduct.price"
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
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      v-model="tempProduct.is_enabled"
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
            <button type="button" @click="updateProduct" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Dashboard_Products",
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products`;
      const vm = this;
      this.$http.get(api).then(res => {
        vm.products = res.data.products;
      });
    },
    openModal(isNew, item) {
      $("#productModal").modal("show");
      const uploadedFileId = this.$refs.files.id;
      document.getElementById(uploadedFileId).value = "";

      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
    },
    openDelModal(item) {
      const vm = this;
      $("#delProductModal").modal("show");
      vm.tempProduct = { ...item };
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/`;
      let httpMethod = "post";
      const vm = this;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        if (res.data.success) {
          $("#productModal").modal("hide");
          vm.getProduct();
        } else {
          $("#productModal").modal("hide");
          vm.getProduct();
        }
      });
    },
    deleteProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api, { data: vm.tempProduct }).then(res => {
        $("#delProductModal").modal("hide");
        vm.getProduct();
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          }
        });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>
