import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Toast } from 'vant'
import { getLang } from '@/i18n/index'
// 不需要传groupId参数的数组
const noGroupIdUrlList = [
  '/order/all/betRecordTab',
  '/merchantAccountServer/api/c/getCMerAccessType'
]

// 前端自己加api
const instance = axios.create({
  timeout: 30 * 1000,
  baseURL:
    process.env.NODE_ENV === 'production' ? window.AIConfig.proxyAddress : '/ai'
})

instance.reqCount = 0 // 请求计数 （需要loading的请求 +1, 所有请求完成后关闭loading）
instance.reqUrlArr = []
let toastLoading

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getToken()
    config.headers['Content-Type'] = 'application/json'
    config.headers.token = token
    config.headers.terType = '16'
    const walletInfo = store.getters['user/walletTypeInfo']
    const walletId = walletInfo.walletId
    config.headers.wid = walletId || 1
    config.headers.lang = getLang()
    config.headers.apiVer = '4.03'
    // other：放置其它需要传入的参数
    const other = config.other || {}
    if (other.cancelToken) {
      config.cancelToken = other.cancelToken
    }
    // 数据源参数
    const { data, params, method, url } = config
    // 聊天室接口特殊处理
    if (url.indexOf('chat') > -1 || url.indexOf('odds/update') > -1) {
      config.baseURL = ''
    }
    let groupId = 3
    if (method === 'post') {
      if (noGroupIdUrlList.indexOf(config.url) < 0) {
        config.data = data || {}
        config.data = Object.assign({}, { groupId }, config.data)
      }
    } else if (method === 'get') {
      if (noGroupIdUrlList.indexOf(config.url) < 0) {
        config.params = params || {}
        groupId = config.params.sportPlatformId || config.params.groupId || 3
        config.params = Object.assign({}, { groupId }, config.params)
      }
    }
    config.headers.groupId = groupId
    // isLoading：是否显示loading提示
    if (other.isLoading) {
      instance.reqCount++
      instance.reqUrlArr.push(config.url)
      toastLoading = Toast.loading({
        duration: 0,
        className: 'ai-loading'
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  response => {
    const resData = response.data || {}
    const { code } = resData
    const config = response.config || {}
    const index = instance.reqUrlArr.indexOf(config.url)
    if (instance.reqCount > 0 && index > -1) {
      instance.reqCount--
      instance.reqUrlArr.splice(index, 1)
    }
    if (instance.reqCount === 0) {
      toastLoading && toastLoading.clear()
    }
    if (code === 200) {
      return resData
    } else if ([401, 403].includes(code)) {
      store.dispatch('user/clearUserInfo')
      return resData
    }
    return Promise.resolve(resData)
  },
  error => {
    if (instance.reqCount > 0) {
      instance.reqCount--
    }
    if (instance.reqCount === 0) {
      toastLoading && toastLoading.clear()
    }
    return Promise.reject(error)
  }
)

export default instance
