import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  console.log("to", to, "from", from, "next");
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      } else {
        next({ path: "/login" });
      }
    });
    console.log("haha");
  } else {
    next();
  }
});
