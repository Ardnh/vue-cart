import { defineStore } from "pinia";
import axios from "axios"
import { Products }  from "../model/products"

interface State {
    binId: string;
    productsList: Products[] | null;
}

export const useProductsStore = defineStore('products', {
    state: (): State => ({
        binId: import.meta.env.VITE_APP_PRODUCTS_BIN_ID,
        productsList: null,
    }),
    getters: {
        getProductsList({productsList}): Products[] | null {
            return productsList
        },
        getProductById({productsList}): (id: number) => Products | null {
            return (id: number) : Products | null  => {

                const product = productsList?.find(item => item.id === id)
                if (product === undefined) {
                    return null
                } else {
                    return product
                }

            }
        }
    },
    actions: {
        async getAllProducts() {
            try {
                const res = await axios.get(`/b/${this.binId}`)
                this.productsList = res.data.record.products
                
            } catch (error) {
              console.log(error)
            }
        },
    }
})