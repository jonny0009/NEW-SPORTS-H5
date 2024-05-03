import './filters'
import bootstrap from '@/bootstrap'
import { initI18n } from '@/i18n'

export default {
  install(Vue) {
    // 启动初始化程序
    Vue.prototype.$bootstrap = bootstrap
    /* 全局事件总线 */
    Vue.prototype.$baseEventBus = new Vue()

    Vue.prototype.$psi18n = initI18n()
    // 注册components全局组件
    // const requireComponent = require.context('@/components', true, /\.vue$/)
    // requireComponent.keys().forEach(fileName => {
    //   const componentConfig = requireComponent(fileName)
    //   const componentName = componentConfig.default.name
    //   if (componentName) {
    //     Vue.component(componentName, componentConfig.default || componentConfig)
    //   }
    // })
  }
}
