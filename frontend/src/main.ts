import { createApp } from "vue"
import { createPinia } from "pinia"
import "./global.scss"
import App from "@/App.vue"
import router from "./router"

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
