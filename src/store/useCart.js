import axios from 'axios'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    binId: import.meta.env.VITE_APP_CART_BIN,
    cartList: [],
    cartListItem: [],
    error: null
  }),
  getters: {
    getCartList: (state) => state.cartList,
    getCartLength: (state) => state.cartListItem.length,
    getErrorMessage: (state) => state.error
  },
  actions: {
    async getCart() {

        try {
            const result = await axios.get(`/b/${this.binId}`)
            this.cartList = result.data.record.cart
            this.cartListItem = JSON.parse(JSON.stringify(result.data.record.cart))
            
        } catch (error) {
            console.log(error)
        }

    },
    async addToCart(data) {

      const productCart = this.cartListItem.find(item => item.id === data.id)

      if(!productCart){
        const payload = {
          cart:[ ...this.cartListItem, data ]
        }
  
        try {
          const res = await axios.put(`/b/${this.binId}`, payload)
          this.cartList = res.data.record.cart
          this.cartListItem = JSON.parse(JSON.stringify(res.data.record.cart))
          
        } catch (error) {
          this.error = error.message
        }
      } else {
        this.error = "This products already exist in cart!"
        console.log(this.error)
      }

    },
    async removeCart(id) {

        const payload = {
          cart : this.cartListItem.filter(item => item.id !== id)
        }

        try {
            const result = await axios.put(`/b/${this.binId}`, payload)
            this.productsDetail = result
            await this.getCart()
            
        } catch (error) {
            console.log(error)
        }
    },
    async updateCart(data) {

      const payload = {
        cart : [...data]
      }
      
      try {
          const result = await axios.put(`/b/${this.binId}`, payload)
          this.cartList = result.data.record.cart
          await this.getCart()
          
      } catch (error) {
          console.log(error)
      }
    }
  }
})
