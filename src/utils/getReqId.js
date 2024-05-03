// 获取指定位数的随机数
const getRandom = m => {
  let str = ''
  var i = 0
  for (i; i < m; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}
export const reqIdStr = requestUrl => {
  const splitUrl = requestUrl.split('?')[0]
  const site = splitUrl.lastIndexOf('/')
  const bizName = splitUrl.substring(site + 1, splitUrl.length)
  const reqIdStr = `${bizName}|${getRandom(10)}`
  return reqIdStr
}
