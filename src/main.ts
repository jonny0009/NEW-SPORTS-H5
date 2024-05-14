import { createApp } from 'vue'
import { APP_ID } from '@/model'
import { setupI18n } from '@/i18n'
import store from '@/store'
// import { useMobile } from '@/hooks'
import storage from '@/config/storage'


import ElementPuls from 'element-plus'
// import { createVuetify }  from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

import 'amfe-flexible'
import 'animate.css'
import 'vuetify/styles'
import 'video.js/dist/video-js.css'
import 'element-plus/dist/index.css'

import './style.less'
import App from './App.vue'

// useMobile() && import('amfe-flexible')

// window.addEventListener('resize', () => { 
//     useMobile() && import('amfe-flexible')
// })

// const vuetify = createVuetify({
//     components,
//     directives,
// })

const app = createApp(App)
app.config.globalProperties.$storage = storage
app.use(store)
app.use(setupI18n)
app.use(ElementPuls)
app.mount(APP_ID)

