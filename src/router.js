import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Shop from "./views/Shop.vue";
import Checkout from "./views/Checkout.vue";
import Cart from "./components/Cart.vue";
import Dashboard from "./views/Dashboard.vue";
import Products from "./components/Dashboard_Products.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/about"
    },
    {
      path: "/",
      redirect: "/about",
      name: "home",
      component: Home,
      children: [
        {
          path: "shop",
          name: "shop",
          component: Shop
        },
        {
          path: "login",
          name: "login",
          component: Login
        },
        {
          path: "about",
          name: "about",
          component: About
        },
        {
          path: "/checkout",
          redirect: "/checkout/cart",
          name: "checkout",
          component: Checkout,
          children: [
            {
              path: "cart",
              name: "checkout-1",
              component: Cart
            }
          ]
        }
      ]
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
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
