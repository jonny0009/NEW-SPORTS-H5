import axios from '@/api/axios'
// 商户配置
export const queryCMerLanguage = (params, other) => {
  return axios({
    url: '/merchantAccountServer/api/c/queryCMerLanguage',
    method: 'get',
    params,
    other
  })
}

// 商户配置
export const businessConfig = (params, other) => {
  return axios({
    url: '/common/businessConfig',
    method: 'get',
    params,
    other
  })
}
// 商户配置
export const getAccassList = (params, other) => {
  return axios({
    url: '/merchant/moduleConfig',
    method: 'get',
    params: { ...params, modeType: 3 },
    other
  })
}
// 商户配置
export const merchantConfig = (params, other) => {
  return axios({
    url: '/app/download/merchantConfigDetail',
    method: 'get',
    params,
    other
  })
}
export const getCMerLanguage = (params, other) => {
  return axios({
    url: 'merchantAccountServer/api/c/getCMerLanguage',
    method: 'get',
    params,
    other
  })
}
// 用户余额
export const playerAccount = (params, other) => {
  return axios({
    url: '/player/playerAccount',
    method: 'get',
    params,
    other
  })
}

// 商户信息
export const queryMerchantInfoNew = (params, other) => {
  return axios({
    url: '/queryMerchantInfoNew',
    method: 'get',
    params,
    other
  })
}
// 查询系统维护时间
export const querySysMaintenanceTime = (params, other) => {
  return axios({
    url: '/dataMaintainStatus',
    method: 'get',
    params,
    other
  })
}
// 获取全部钱包列表 用于映射 关于币种的描述
export const getAllWalletList = (params, other) => {
  return axios({
    url: '/walletmanager/api/c/getWalletAll',
    method: 'get',
    params,
    other
  })
}
// 查询余额
export const getBalance = (params, other) => {
  return axios({
    url: '/player/getBalance',
    method: 'get',
    params,
    other
  })
}
// 区分接入商户
export const getCMerAccessType = (params, other) => {
  return axios({
    url: '/merchantAccountServer/api/c/getCMerAccessType',
    method: 'get',
    params,
    other
  })
}

// 获取当前商户接入的币种类型
export const getCMerAccessWallet = (params, other) => {
  return axios({
    url: '/merchantAccountServer/api/c/getCMerAccessWallet',
    method: 'get',
    params,
    other
  })
}

// 获取游戏
export const getGameUrl = (params, other) => {
  return axios({
    url: '/game/url/new',
    method: 'get',
    params,
    other
  })
}

export const getRBMatch = (params, other) => {
  return axios({
    url: '/matches/commonMatches',
    method: 'get',
    params
  })
}
export const businessConsult = (data, other) => {
  return axios({
    url: '/businessConsult',
    method: 'post',
    data
  })
}
