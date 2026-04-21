import './assets/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(plugin, defaultConfig(config))
app.use(ToastPlugin)

app.mount('#app');
