import axios from '@/api/axios'
// 商户配置
export const loginTemp = (data, other) => {
  return axios({
    url: '/loginTemp/v2',
    method: 'post',
    data,
    other
  })
}
// 登出账户
export const logout = (params, other) => {
  return axios({
    url: '/player/logout',
    method: 'get',
    params,
    other
  })
}

export const login = (data, other) => {
  return axios({
    url: '/login',
    method: 'post',
    data,
    other
  })
}
