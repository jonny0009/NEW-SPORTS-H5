export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// 获取url参数
export const getUrlParams = params => {
  const urlParams = params || window.location.search
  const paramsMap = {}
  const urlParamsArr = urlParams.replace('?', '').split('&')
  urlParamsArr &&
    urlParamsArr.forEach(item => {
      const temp = item.split('=')
      paramsMap[temp[0]] = temp[1]
    })
  return paramsMap
}

// 打开新窗口
export const openWindow = () => {
  return window.open('', '_blank')
}

// 是否是安卓
export const isAndroid = () => {
  var u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

/**
 * @description: 防抖
 * @param {type}
 * @return: 1
 */

export const debounce = (fn, ms, immediate) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, ms)
      if (callNow) {
        fn.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args)
      }, ms)
    }
  }
}

/**
 * @description: 节流函数，单一时间只触发一次
 * @param {type} ms fn
 * @return:
 */

export const throttle = (fn, ms) => {
  let last = 0
  return function () {
    const args = arguments
    const context = this
    const nowTime = Date.now()
    if (nowTime - last > ms) {
      fn.apply(context, ...args)
      last = nowTime
    }
  }
}

// 数据展开递归[1,2,3,[4,5,[7,8]]]-->[1,2,3,4,5,6,7,8]
export const flatdeepArrs = arr => {
  let resultArr = []
  Array.isArray(arr) &&
    arr.forEach(x => {
      if (x instanceof Array) {
        resultArr = resultArr.concat(this.flatdeepArrs(x))
      } else {
        resultArr.push(x)
      }
    })
  return resultArr
}

// 数组去重
export const unique = (arr, fn) => {
  const hashMap = {}
  const dupArr = []
  Array.isArray(arr) &&
    arr.forEach(val => {
      const key = fn(val)
      if (!hashMap[key]) {
        dupArr.push(val)
        hashMap[key] = true
      }
    })
  return dupArr
}

// 移除完当前页表格数据后，请求上一页数据
// 参数示例：pagecfg = {pageIdx:1,size:20,total:0}
export const pageByRemoval = pageCfg => {
  const { pageIdx, size, total } = pageCfg
  const curTotal = total - 1
  const curPageIdx =
    Math.ceil(curTotal / size) < 1 ? 1 : Math.ceil(curTotal / size)
  return curPageIdx < pageIdx ? curPageIdx : pageIdx
}

// 输入金额控制(去除一些不合规则的字符)
export const oninput = str => {
  const _str = str
    .replace(/(^00)/, '')
    .replace(/^[^\d]*(\d*\.?\d{0,2})(.*)?$/, '$1')
  if (_str.length >= 9) {
    return _str.substring(0, 9)
  }
  return _str
}

// 加法函数(防丢精度)
export const accAdd = (arg1, arg2) => {
  let r1
  let r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 减法函数(防丢精度)
export const subtr = (arg1, arg2) => {
  let r1
  let r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2)) // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2
  return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n))
}

// 乘法函数(防丢精度)
export const accMul = (arg1, arg2) => {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    // console.error(e)
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    // console.error(e)
  }
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

// 除法函数(防丢精度)
export const accDiv = (arg1, arg2) => {
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    // console.error(e)
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    // console.error(e)
  }
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return this.accMul(r1 / r2, Math.pow(10, t2 - t1))
}

export const contactUrl = (location, path) => {
  if (location && !path) {
    return location
  }
  if (
    typeof location === 'string' &&
    location !== '' &&
    typeof path === 'string' &&
    path !== ''
  ) {
    if (location[location.length - 1] === '/' && path[0] === '/') {
      const newLocation = location.slice(0, -1)
      return newLocation + path
    } else if (location[location.length - 1] !== '/' && path[0] !== '/') {
      return location + '/' + path
    }
    return location + path
  }
  return ''
}

// 获取url参数
export const getURLSearchParams = () => {
  const search = window.location.search
  const params = {}
  const splits = search.replace('?', '').split('&')
  splits.forEach((item) => {
    const temp = item.split('=')
    if (temp.length > 1) {
      params[temp[0]] = temp[1]
    }
  })
  return params
}

// 获取默认语言
export const getBrowserLanguage = () => {
  const searchParams = getURLSearchParams()
  if (window.navigator && window.navigator.language) {
    const obj = {
      'zh-cn': 'zh-cn',
      'zh-tw': 'zh-tw',
      'en-us': 'en-us',
      'vi-vn': 'vi-vn',
      'th-th': 'th-th',
      'ko-kr': 'ko-kr',
      'pt-pt': 'pt-pt',
      en: 'en-us',
      vi: 'vi-vn',
      th: 'th-th',
      ko: 'ko-kr',
      pt: 'pt-pt'
    }

    let sysLanguage = ''
    if (searchParams && searchParams.lang) {
      sysLanguage = searchParams.lang
    } else {
      sysLanguage = window.navigator.language.toLowerCase()
    }

    return obj[sysLanguage] ? obj[sysLanguage] : 'en-us'
  }
  return 'en-us'
}
