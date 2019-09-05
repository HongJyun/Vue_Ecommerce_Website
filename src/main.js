import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import router from "./router";
import App from "./App.vue";
import "./bus";
import CurrencyFilter from "./filters/currency";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("Loading", Loading);
Vue.filter("currency", CurrencyFilter);

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      } else {
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});
