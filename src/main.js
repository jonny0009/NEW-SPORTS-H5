import './public-path'
import '@/styles/index.less'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import '@/utils/rem'
import './rem.js'
import Vue from 'vue'
import { initI18n } from '@/i18n'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import xss from 'xss'
import plugins from '@/plugins'
import bootstrap from '@/bootstrap'
// import VConsole from 'vconsole'
//
//
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'

//
Vue.use(Vant)
Vue.use(plugins)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false
// 挂载 xss 预防xss攻击 (目前已用到 利用xss模块重写 v-html) 其他地方 例如输入框提交的文本 可以用 this.xss(value) 包裹使用
Vue.prototype.xss = xss

const init = Vue.prototype._init
Vue.prototype._init = function (options) {
  init.call(this, {
    i18n: initI18n(),
    ...options
  })
}
window.i18n = initI18n()
const start = async () => {
  try {
    // 初始化调用方法
    await bootstrap()
  } catch (error) {
    console.error(error)
  }
  // 构建实例
  new Vue({
    i18n: initI18n(),
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
start()
