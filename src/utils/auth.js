import localStore from '@/utils/localStore'
const TokenKey = '_h5_tokenV1_'
export function getToken() {
  return localStore.getItem(TokenKey)
}
export function setToken(token) {
  return localStore.setItem(TokenKey, token)
}
