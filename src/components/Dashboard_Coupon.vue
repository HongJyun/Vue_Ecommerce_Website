<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="text-right">
      <button class="btn btn-outline-primary mb-2" @click="openModal(true)">新增優惠券</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">優惠券名稱</th>
          <th scope="col">折扣(%)</th>
          <th scope="col">優惠期限</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.code">
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.description }}</td>
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
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="form-row">
                  <div class="form-group col">
                    <label for="title">優惠券名稱</label>
                    <input
                      required
                      v-model="tempCoupon.title"
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="origin_price">折扣(%)</label>
                    <input
                      required
                      v-model="tempCoupon.origin_price"
                      type="number"
                      max="100"
                      min="0"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入折扣%數"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col">
                    <label for="description">優惠期限</label>
                    <input
                      required
                      v-model="tempCoupon.description"
                      type="date"
                      class="form-control"
                      id="description"
                      placeholder="請輸入到期日"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="content">優惠代碼</label>
                    <input
                      required
                      v-model="tempCoupon.content"
                      type="text"
                      class="form-control"
                      id="content"
                      placeholder="請輸入優惠券代碼"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      v-model="tempCoupon.is_enabled"
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
            <button type="button" @click="updateCoupon" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @emitPagination="getCoupons" />
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";

export default {
  name: "Dashboard_Coupons",
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      fullPage: true,
      status: {
        fileUploading: false
      }
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log(res);
        vm.coupons = res.data.coupons;
        vm.isLoading = false;
        vm.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item) {
      $("#productModal").modal("show");

      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = { ...item };
        this.isNew = false;
      }
    },
    openDelModal(item) {
      const vm = this;
      $("#delCouponModal").modal("show");
      vm.tempCoupon = { ...item };
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/`;
      let httpMethod = "post";
      const vm = this;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(res => {
        console.log("update", res.data);
        if (res.data.success) {
          $("#productModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#productModal").modal("hide");
          vm.getCoupons();
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    deleteCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api, { data: vm.tempCoupon }).then(res => {
        $("#delCouponModal").modal("hide");
        vm.getCoupons();
      });
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getCoupons();
  }
};
</script>
