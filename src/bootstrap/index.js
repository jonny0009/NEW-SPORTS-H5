import { getToken } from '@/utils/auth'
import store from '@/store'
import { getUrlParams } from '@/utils'
export default async () => {
  // 获取url中 mDomain 参数
  let token
  let backUrl
  const locationHash = location.href
  // 首先获取token
  if (locationHash.indexOf('token=') > -1) {
    // 从url中获取token
    const locationSplit = getUrlParams()
    token = locationSplit.token
    store.commit('user/SET_TOKEN', token)
    backUrl = locationSplit.mDomain
    // 商户url
    if (backUrl) {
      localStorage.setItem('businessBackUrl', decodeURIComponent(backUrl))
    }
  } else {
    // 从缓存中获取token
    token = getToken()
  }
  // 商户语言
  store.dispatch('user/playerAccount')
  // 商户配置
  store.dispatch('app/businessConfig')
  // 商户配置2
  store.dispatch('app/merchantConfig')

  // if (token) {
  //   // 用户信息
  //   store.dispatch('user/playerAccount')
  //   // 查询用户余额
  //   store.dispatch('user/getBalance')
  // }
}
