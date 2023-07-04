import pinia from "./pinia"
import router from "../router"

export const registerPlugins = (app) => {
    app
        .use(pinia)
        .use(router)
}