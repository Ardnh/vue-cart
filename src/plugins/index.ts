import { App } from "vue"
import router from "../router"
import pinia from "./pinia"

export const registerPlugins = (app: App) => {
    app
        .use(pinia)
        .use(router)
}