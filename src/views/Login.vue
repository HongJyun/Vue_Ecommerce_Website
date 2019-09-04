<template>
  <div>
    <section class="container px-0">
      <div class="row no-gutters d-flex justify-content-center">
        <div class="col-md-10">
          <div class="p-5 bg-primary d-md-none">
            <h1 class="mt-2 mb-2 text-center text-white">會員登入</h1>
          </div>
          <div class="row flex-md-row-reverse no-gutters">
            <div class="col-md-6 py-md-3">
              <div class="bg-light p-5">
                <h2 class="h4 text-center text-primary-light mb-5 d-none d-md-block">—— 連結社群帳號 ——</h2>
                <div class="row no-gutters">
                  <div class="col-4 col-md-12 mb-md-4">
                    <button class="btn bg-white btn-block btn-lg py-3 h-100">
                      <img src="/img/ic-facebook-logotype.svg" class="img-fluid" width="108" alt />
                    </button>
                  </div>
                  <div class="col-4 col-md-12 mb-md-4">
                    <button class="btn bg-white btn-block btn-lg py-3 h-100">
                      <img src="/img/ic-google.svg" class="img-fluid" width="94" alt />
                    </button>
                  </div>
                  <div class="col-4 col-md-12 mb-md-4">
                    <button class="btn bg-white btn-block btn-lg py-3 h-100">
                      <img src="/img/ic-yahoo.svg" class="img-fluid" width="97" alt />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="p-5 bg-primary d-md-block d-none">
                <h1 class="mt-2 mb-2 text-center text-white">會員登入</h1>
              </div>
              <form @submit.prevent="signin" class="p-5 pt-md-0 bg-primary">
                <div
                  class="bg-light form-square form-square-withicon d-flex justify-content-between mb-3 py-3"
                >
                  <label for="account" class="material-icons form-square-icon-left">person</label>
                  <input
                    class="form-input"
                    type="text"
                    id="account"
                    autocomplete="username"
                    placeholder="電子信箱/手機號碼"
                    v-model="user.username"
                  />
                </div>
                <div
                  class="bg-light form-square form-square-withicon d-flex justify-content-between mb-3 py-3"
                >
                  <label for="password" class="material-icons form-square-icon-left">vpn_key</label>
                  <input
                    class="form-input"
                    type="password"
                    autocomplete="current-password"
                    id="password"
                    placeholder="請輸入使用者密碼"
                    v-model="user.password"
                  />
                </div>
                <div class="custom-control custom-checkbox mb-0">
                  <input type="checkbox" class="custom-control-input" id="rememberme" />
                  <label class="custom-control-label text-white" for="rememberme">記住我</label>
                </div>
                <button
                  type="submit"
                  class="btn btn-accent btn-block rounded-0 btn-lg py-3 text-primary btn-lg-font font-weight-bold"
                >登入帳號</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(res => {
        if (res.data.success) {
          vm.$router.push("/admin/products");
        }
      });
    }
  }
};
</script>
