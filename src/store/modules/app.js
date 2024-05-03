import {
  queryCMerLanguage,
  businessConfig,
  merchantConfig,
  queryMerchantInfoNew,
  querySysMaintenanceTime,
  getAllWalletList,
  getAccassList,
  getCMerLanguage
} from '@/api/common'
// import SocketItem from '@/serve/socket'
import { logout } from '@/api/login'
import Vue from 'vue'
import { setLanguage } from '@/i18n/index'
import localStore from '@/utils/localStore'
import { StorageKey } from '@/config/constants'

const state = {
  isPc: false,
  isPcClientWidth: 0,
  Fingerprint2Time: null,
  changeLan: '',
  leftMenuPopShow: false,
  queryCMerLanguage: {},
  businessConfig: {},
  doubleLineInfo: {},
  sysMaintenance: false, // 系统是否维护
  allLeaguesByGame: [],
  todayMatchByGame: [],
  showBetHistoryTips: false, // 第一次进入显示投注记录按钮提示信息
  merchantConfigDetail: {}, // 商户配置信息
  merchantConfigDetailLoading: false, // 商户配置信息loading
  liveInfo: {}, // 商户配置信息
  webSocket: null,
  langTeamObj: {},
  accessLanguage: null,
  translate: {}
}
const getters = {
  isPc: state => state.isPc,
  queryCMerLanguage: state => state.queryCMerLanguage,
  businessConfig: state => state.businessConfig,
  doubleLineInfo: state => state.doubleLineInfo,
  allLeaguesByGame: state => state.allLeaguesByGame,
  todayMatchByGame: state => state.todayMatchByGame,
  merchantConfigDetail: state => state.merchantConfigDetail,
  merchantConfigDetailLoading: state => state.merchantConfigDetailLoading,
  liveInfo: state => state.liveInfo,
  webSocket: state => state.webSocket,
  accassList: state => state.webSocket,
  langTeamObj: state => state.langTeamObj,
  accessLanguage: state => state.accessLanguage,
  translate: state => state.translate
}
const mutations = {
  setLangTeamObj(state, data) {
    state.langTeamObj[data.gidm] = data.info
  },
  setLeftMenuPopShow(state, val) {
    state.leftMenuPopShow = val
  },
  setSysMaintenance(state, val) {
    state.sysMaintenance = val
  },
  setKeyValue(state, { key, value }) {
    state[key] = value
  },
  setBetHistoryTips(state, val) {
    state.showBetHistoryTips = val
  },
  setMerchantConfig(state, val) {
    state.merchantConfigDetail = val
  },
  setMerchantConfigLoading(state, val) {
    state.merchantConfigDetailLoading = val
  },
  accessLanguage(state, val) {
    state.accessLanguage = val
  },
  translate(state, val) {
    state.translate = val
  },
  setSocket(state, val) {
    state.webSocket = val
  },
  setAccassList(state, val) {
    state.accassList = val
  }
}

const actions = {
  // 商户语言
  async queryCMerLanguage({ state }) {
    const res = await queryCMerLanguage()
    const langStore = localStore.getItem(StorageKey.LANG)
    if (res.code === 200 && res.data) {
      if (res.data.accessLanguage && res.data.accessLanguage.length) {
        const lang = res.data.accessLanguage[0].key
        if (langStore !== lang) {
          setLanguage(lang)
          window.location.href = '/home'
        }
      }
    }
    state.queryCMerLanguage = res.data || {}
  },
  // 商户配置
  async businessConfig({ state }) {
    const res = await businessConfig()
    state.businessConfig = res.data || {}
  },
  async merchantConfig({ commit }) {
    commit('setMerchantConfigLoading', false)
    const res = await merchantConfig()
    if (res.code === 200) {
      const data = res.data || {}
      commit('setMerchantConfig', data)
      const { merchantId } = data
      const subRes = await getCMerLanguage({
        groupId: 0,
        merchantId
      })

      commit('accessLanguage', subRes.data.accessLanguage || [])
      commit('translate', subRes.data.translate || {})
    }
    commit('setMerchantConfigLoading', true)
  },
  async getAccassList({ commit }) {
    const res = await getAccassList()
    if (res.code === 200) {
      commit('setAccassList', res.data.moduleList || {})
    }
  },

  // 查询商户信息
  async queryMerchantInfoNew() {
    const res = await queryMerchantInfoNew()
    return res
  },
  // 查询系统维护时间
  async querySysMaintenanceTime({ commit }) {
    const res = await querySysMaintenanceTime()
    if (res && res.code === 200) {
      const data = res.data || []
      // data = [
      //   { 1: '1,2021-05-17 14:22:33,2021-05-18 16:22:13,false' },
      //   { 2: '2,2021-05-17 14:22:33,2021-05-18 16:22:13,false' }
      // ]
      if (data.length) {
        // 筛选groupId 为1的数据
        const findGroupIdObj = data.filter(x => x[0] === '1')[0]
        if (findGroupIdObj) {
          const mainInfo = Object.values(findGroupIdObj).join().split(',')
          // 是否整个系统维护
          if (mainInfo[3] === 'true') {
            commit('setSysMaintenance', true)
          } else {
            commit('setSysMaintenance', false)
          }
        }
      }
    }
    return res
  },

  //
  setIsPC({ state }, val) {
    state.isPc = val
  },

  //
  setClientWidth({ state }, val) {
    state.isPcClientWidth = val
  },

  async getAllWalletList() {
    const res = await getAllWalletList()
    return res
  },
  async logout({ commit }) {
    await logout()
    commit('user/clearUserInfo', null, { root: true })
    Vue.prototype.$rightUserPop.hide()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
