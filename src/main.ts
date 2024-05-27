import { createApp } from 'vue'
import { APP_ID } from '@/model'
import { setupI18n } from '@/i18n'
import store from '@/store'
import storage from '@/config/storage'
import ElementPuls from 'element-plus'

import 'amfe-flexible'
import 'animate.css'
import 'vuetify/styles'
import 'video.js/dist/video-js.css'
import 'element-plus/dist/index.css'

import './style.less'
import App from './App.vue'
import { EventBus } from './EventBus'


const app = createApp(App)
app.config.globalProperties.$storage = storage
app.use(store)
app.use(setupI18n)
app.use(ElementPuls)
app.provide('eventBus', EventBus);
app.mount(APP_ID)

