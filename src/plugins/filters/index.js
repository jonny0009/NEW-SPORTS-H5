import Vue from 'vue'
// 遍历当前过滤器注册
const requireComponent = require.context('@/plugins/filters', false, /\.js$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const defaultFun = componentConfig.default
  if (defaultFun) {
    const name = fileName.replace(/.\/|.js/g, '')
    // 注册当前过滤器为全局方法，方法名为 $+文件名
    Vue.prototype[`$${name}`] = defaultFun
    // 注册过滤器，过滤器名称为文件名称
    Vue.filter(name, defaultFun)
  }
})
