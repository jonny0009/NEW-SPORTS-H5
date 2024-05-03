/**
 * url地址修改
 * @param url 待修改url
 * @param arg 修改的参数名
 * @param arg_val 修改的具体值
 * @returns {String}
 */

export function evil(fn) {
  const Fn = Function
  return new Fn('return ' + fn)()
}

export function changeUrlParams(url, arg, argVal) {
  const pattern = arg + '=([^&]*)'
  const replaceText = arg + '=' + argVal
  if (url.match(pattern)) {
    let tmp = '/(' + arg + '=)([^&]*)/gi'
    // eval自定义 evil
    tmp = url.replace(evil(tmp), replaceText)
    return tmp
  }
  if (url.match('[?]')) {
    return url + '&' + replaceText
  }
  return url + '?' + replaceText
}
