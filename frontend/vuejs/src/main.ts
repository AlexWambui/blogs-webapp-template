import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(plugin, defaultConfig(config))

app.mount('#app')
