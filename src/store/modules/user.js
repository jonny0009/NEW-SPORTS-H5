import { getToken, setToken } from '@/utils/auth'
// import { Dialog } from 'vant'
import { contactUrl } from '@/utils/util'
import Store from '@/store'
// import { initI18n } from '@/i18n/index'
// import appState from './app'

import {
  playerAccount,
  getBalance,
  getCMerAccessType,
  getCMerAccessWallet
} from '@/api/common'
const token = getToken()
const state = {
  reRegister: null,
  token,
  accountInfo: {},
  userConfig: {},
  balanceInfo: {},
  logoutState: !token,
  merchantAccessType: '', // 商户接入类型
  walletTypeInfo: {} // 商户接入钱包信息
}
const getters = {
  token: state => state.token,
  userConfig: state => state.userConfig,
  balanceInfo: state => state.balanceInfo,
  logoutState: state => state.logoutState,
  merchantAccessType: state => state.merchantAccessType,
  accountInfo: state => state.accountInfo,
  walletTypeInfo: state => state.walletTypeInfo
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    state.logoutState = false
    setToken(token)
  },
  setBalanceInfo(state, val) {
    state.balanceInfo = val
  },
  // 用户配置
  setUserConfig(state, val) {
    if (!val.handicapType) {
      val.handicapType = 'H'
    }
    if (val.orderType && val.orderType === 1) {
      val.orderType = 2
    }
    state.userConfig = val
  },
  // 清除用户信息，这个方法放在最后
  clearUserInfo(state) {
    setToken('')
    state.token = null
    state.accountInfo = {}
    state.userConfig = {}
  }
}

const actions = {
  // 获取用户余额
  async playerAccount({ state }) {
    const res = await playerAccount()
    state.accountInfo = res.data || {}
  },

  // 查询用户余额
  async getBalance({ commit }) {
    const res = await getBalance()
    commit('setBalanceInfo', res.data || {})
  },
  // 清空用户信息
  clearUserInfo({ state, commit }) {
    state.logoutState = true
    commit('setUserConfig', {})
    commit('clearUserInfo')
    const pathName = location.pathname
    if (pathName !== '/login') {
      // 判断token失效后跳转路径
      const businessConfig = Store.state.app.businessConfig || {}
      const login =
        businessConfig.login && businessConfig.login.replace(/ /g, '')
      const businessBackUrl = localStorage.getItem('businessBackUrl')
      const newLoginPath = contactUrl(
        decodeURIComponent(businessBackUrl),
        login
      )
      if (login && login.indexOf('http') > -1) {
        // 优先跳转到后台配置的 登录路径
        top.location.href =
          login + '?backUrl=' + encodeURIComponent(location.href)
      } else if (businessBackUrl) {
        // 后台没有配置登录路径  则跳转的url带来的businessBackUrl
        top.location.href = newLoginPath
      } else {
        // 登录失效重新登录 APP.html
        state.reRegister = new Date().getTime()
      }
    }
  },
  // 查询接入商户
  async getCMerAccessType({ state }) {
    const res = await getCMerAccessType()
    state.merchantAccessType = res.data && res.data.sourceType
  },
  // 查询商户接入的币种
  async getCMerAccessWallet({ state }) {
    const res = await getCMerAccessWallet()
    state.walletTypeInfo = res.data?.[0]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
