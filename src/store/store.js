import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    pagination: {}
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    getProducts (context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${context.pagination}`
      context.commit('LOADING', true)
      axios.get(api).then(res => {
        context.commit('PRODUCTS', res.data.products)
        context.commit('LOADING', false)
        context.commit('PAGINATION', res.data.pagination)
      })
    }
  }
})
