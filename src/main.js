import '@/assets/scss/main.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import setAxiosDefaults from '@/config/axios.config'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css"

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
const pinia = createPinia()

setAxiosDefaults()

app.use(vuetify).use(pinia).use(router).use(VueQueryPlugin).mount('#app')
