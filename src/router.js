import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Products from "./components/Dashboard_Products.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "products",
          name: "products",
          component: Products,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
