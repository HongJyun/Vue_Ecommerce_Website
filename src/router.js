import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Shop from "./views/Shop.vue";
import ShopItemDetail from "./views/ShopItemDetail.vue";

import Checkout from "./views/Checkout.vue";
import Cart from "./components/Cart.vue";
import Order from "./components/Order.vue";
import Order_check from "./components/Order_check.vue";

import Dashboard from "./views/Dashboard.vue";
import Products from "./components/Dashboard_Products.vue";
import Coupon from "./components/Dashboard_Coupon.vue";
import Order_review from "./components/Dashboard_Order.vue";

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
          redirect: "shop/all"
        },
        {
          path: "shop/:category",
          name: "shop",
          component: Shop
        },
        {
          path: "itempage/:itemId",
          name: 'itempage',
          component: ShopItemDetail
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
            },
            {
              path: "order",
              name: "order",
              component: Order
            },
            {
              path: "order_check/:orderId",
              name: "order_check",
              component: Order_check
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
        },
        {
          path: "coupon",
          name: "coupon",
          component: Coupon,
          meta: { requiresAuth: true }
        },
        {
          path: "order",
          name: "order_review",
          component: Order_review,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
