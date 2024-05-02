import { createApp } from 'vue'
import { APP_ID } from '@/model'
import { setupI18n } from '@/i18n'
import storage from '@/config/storage'

import 'amfe-flexible'
import 'video.js/dist/video-js.css'

import './style.less'
import App from './App.vue'


const app = createApp(App)
app.config.globalProperties.$storage = storage
app.use(setupI18n)
app.mount(APP_ID)
