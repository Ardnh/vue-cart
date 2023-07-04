import axios from 'axios'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    binId: import.meta.env.VITE_APP_PRODUCTS_BIN,
    productsList: null,
    productDetail: null,
    error: null
  }),
  getters: {
    getProductsList: (state) => state.productsList,
    getError: (state) => state.error
  },
  actions: {
    async getProducts() {

      try {
        const res = await axios.get(`/b/${this.binId}`)
        this.productsList = res.data.record.products
        
      } catch (error) {
        console.log(error)
      }

    },
    async getProductById(id) {
      try {
        const data = await axios.get(`${this.baseUrl}/products/${id}`)
        this.productsDetail = data
        
      } catch (error) {
        console.log(error)
      }
    },
  }
})
