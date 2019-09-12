import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

import router from './router'
import store from './store/store'
import App from './App.vue'
import './bus'
import CurrencyFilter from './filters/currency'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.component('Loading', Loading)
Vue.filter('currency', CurrencyFilter)

axios.defaults.withCredentials = true

// vee-validate
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})

Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

// router guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`
    axios.post(api).then(res => {
      if (res.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
