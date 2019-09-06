<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">購買人</th>
          <th scope="col">留言</th>
          <th scope="col">訂單金額</th>
          <th scope="col">付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.num">
          <td>{{ item.create_at }}</td>
          <td>{{ item.user.name }}</td>

          <td>{{ item.message }}</td>
          <td>{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">付款完成</span>
            <span v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPagination="getOrders" />
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";

export default {
  name: "Dashboard_Order",
  data() {
    return {
      orders: [],
      pagination: {},
      fullPage: true
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        console.log(res);
        vm.orders = res.data.orders;
        vm.isLoading = false;
        vm.pagination = res.data.pagination;
      });
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getOrders();
  }
};
</script>
