import { defineStore } from "pinia";
import axios from "axios"
import { Cart } from "../model/carts"

interface State {
    binId: string;
    cartList: Cart[] | null,
    cartListItem: Cart[] | null
    errorMessage: string | null
}

export const useCartsStore = defineStore('carts', {
    state: (): State => ({
        binId: import.meta.env.VITE_APP_CARTS_BIN_ID,
        cartList: null,
        cartListItem: null,
        errorMessage: null
    }),
    getters: {
        getCartList: ({cartList}) => cartList,
        getCartLength: ({cartListItem}) => cartListItem?.length,
    },
    actions: {
        async getCart() {

            try {
                const result = await axios.get(`/b/${this.binId}`)
                this.cartList = result.data.record.cart
                this.cartListItem = JSON.parse(JSON.stringify(result.data.record.cart))
                
            } catch (error: any) {
                console.error(error.message)
            }
    
        },
        async addToCart(data: Cart) {

            const productCart = this.cartListItem?.find(item => item.id === data.id)
            if(!productCart){
                if (this.cartListItem !== null) {
                    const payload = {
                      cart:[ ...this.cartListItem, data ]
                    }

                    try {
                        const res = await axios.put(`/b/${this.binId}`, payload)
                        this.cartList = res.data.record.cart
                        this.cartListItem = JSON.parse(JSON.stringify(res.data.record.cart))
                        
                    } catch (error: any) {
                        this.errorMessage = error.message
                        console.error(error.message)
                    }
                }
            } else {
              this.errorMessage = "This products already exist in cart!"
            }
            
        },
        async removeFromCart(id: number) {

            let filteredCart = this.cartListItem?.filter(item => item.id !== id)

            const payload = {
              cart : filteredCart
            }
    
            try {
                await axios.put(`/b/${this.binId}`, payload)
                await this.getCart()
                
            } catch (error:any) {
                console.log(error.message)
            }
        },
        async updateCart(data: Cart[]) {

            const payload = {
              cart : [...data]
            }
            
            try {
                const result = await axios.put(`/b/${this.binId}`, payload)
                this.cartList = result.data.record.cart
                await this.getCart()
                
            } catch (error:any) {
                console.log(error.message)
            }
        }
    }
})