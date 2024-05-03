import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
Vue.use(VueRouter)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  if (value.default) {
    modules.push(...value.default)
  }
  return modules
}, [])
export const routes = [
  ...modules
  // {
  //   path: '/',
  //   redirect: '/home'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 页面跳转的时候滚到顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 解决vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export function resetRouter() {
  const newRouter = router()
  // reset router
  router.matcher = newRouter.matcher
}

router.beforeEach((to, from, next) => {
  // 获取token
  const token = getToken()
  if (token && to.name === 'Login') {
    next({ name: 'Home' })
  } else {
    next()
  }
})
export default router
