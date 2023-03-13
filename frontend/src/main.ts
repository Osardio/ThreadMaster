import {createApp} from "vue"
import {createPinia} from "pinia"
import App from "@/App.vue"
import router from "./router"
/*import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives
})*/

createApp(App)
  .use(router)
  //.use(vuetify)
  .use(createPinia())
  .mount('#app')
