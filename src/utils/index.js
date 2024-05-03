import device from '@/utils/device'
import img from '@/plugins/filters/img'
const util = {
  sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
  // 对象深copy (递归方式)
  copy: function (source) {
    const t = this
    if (source === null || typeof source !== 'object') {
      return source
    }
    const isArr = Array.isArray(source)
    const result = isArr ? [] : {}
    if (!isArr) {
      for (const k in source) {
        _handler(k)
      }
    } else {
      for (let i = 0; i < source.length; i++) {
        _handler(i)
      }
    }
    function _handler(key) {
      result[key] =
        typeof source[key] === 'object' && source[key] !== null
          ? t.copy(source[key])
          : source[key]
    }
    return result
  },
  /**
   * @description 小数四舍五入
   * @param num 源
   * @param n 保留的小数位数
   **/
  roundDecimal: function (num, n) {
    const nn = Math.pow(10, n)
    return Math.round(num * nn) / nn
  },
  /**
   * {a:1,b:2} 转成 a=1&b=2
   */
  dataParams: function (data) {
    const arr = []
    for (const k in data) {
      arr.push(k + '=' + (data[k] || ''))
    }
    return arr.join('&')
  },
  /**
   * 根据key获取数组中的某一项 data: [{a:1}, {a:2}] key: 'a' val: 2 isChildren: boolean returnType返回类型：first|last|all
   */
  getItemByKey: function (
    _data,
    _key,
    _val,
    _isChildren = false,
    returnType = 'first'
  ) {
    let _item
    const _items = []
    _loop(_data, _key, _val, _isChildren)
    function _loop(data, key, val, isChildren) {
      for (let i = 0; i < data.length; i++) {
        if (data[i][key] === val) {
          // _item = data[i]
          _items.push(data[i])
        } else if (isChildren && Array.isArray(data[i].children)) {
          _loop(data[i].children, key, val, isChildren)
        }
      }
    }
    if (returnType === 'first') {
      return _items[0] || null
    } else if (returnType === 'last') {
      return _items.length ? _items[_items.length - 1] : null
    } else if (returnType === 'all') {
      return _item // array
    }
  },
  /**
    * 从一维数组转换为树形结构数据
    例：
    let _data = [
      {id: '1', pid: '0'},
      {id: '2', pid: '1'}
    ]
    =>
    [
      {id: '1', pid: '0', children: [{id: '2', pid: '1'}]}
    ]
    */
  tranArrToTree(_data, key = 'pid') {
    // 先把data copy一份
    const data = this.copy(_data)
    const arr = [] // 结果
    // 再查找>0的
    data.forEach(item => {
      // 先把pid=0的放进第一层
      if (item[key] * 1 === 0) {
        arr.push(item)
      }
      if (item[key] * 1 > 0) {
        // 拿当前pid匹配对象的ID，匹配到就在当前对象新增一个children并push
        const parent = this.getItemByKey(
          arr,
          'id',
          item[key] * 1,
          true,
          'first'
        )
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(item)
        }
      }
    })
    return arr
  },
  // 上面函数的反转(不保证顺序)
  tranTreeToArr(_data) {
    // 先把data copy一份
    const data = this.copy(_data)
    const arr = []
    const _loop = list => {
      list.forEach(item => {
        const _item = {}
        for (const k in item) {
          if (k !== 'children') {
            _item[k] = item[k]
          }
        }
        arr.push(_item)
        if (item.children) {
          _loop(item.children)
        }
      })
    }
    _loop(data)
    return arr
  },
  /**
   * 根据key获取数组中的某一项的index data: [{a:1}, {a:2}] key: 'a' val: 2
   */
  getItemIdxByKey: function (data, key, val) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][key] === val) {
        return i
      }
    }
    return null
  },
  // 获取json的length
  getJsonLen: function (obj) {
    let n = 0
    for (const k in obj) {
      if (k) {
        n++
      }
    }
    return n
  },
  // 日期函数
  date: {
    // 获取前几天/后几天的日期
    showdate: function (n, d) {
      let uom
      if (!d) {
        uom = new Date()
      } else {
        uom = new Date(d)
      }
      uom.setDate(uom.getDate() + n)
      const _m = uom.getMonth() + 1
      const _d = uom.getDate()
      uom =
        uom.getFullYear() +
        '-' +
        (_m >= 10 ? _m : '0' + _m) +
        '-' +
        (_d >= 10 ? _d : '0' + _d)
      return uom
    },
    // 根据时间戳获取时间
    getDate: function (timesmap) {
      const date = timesmap ? new Date(timesmap) : new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return {
        year: date.getFullYear(),
        month: month < 10 ? '0' + month : month,
        day: day < 10 ? '0' + day : day,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      }
    },
    // 格式化
    format: function (input, fmt) {
      if (input === 0 || !/^[0-9]+$/.test(input)) {
        return ''
      }
      if (typeof input === 'string') {
        input = input * 1
      }
      fmt = fmt || 'yyyy/MM/dd HH:mm:ss' // 默认
      const date = new Date(input)
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    },
    // 20190101 => 2019-01-01  separator为分割符 选传
    parseShortDate: function (strDate, separator) {
      if (strDate.length < 4) {
        return strDate
      }
      separator = separator || '-'
      let newDate = strDate.substring(0, 4)
      if (strDate.length > 4) {
        newDate += separator + strDate.substring(4, 6)
      }
      if (strDate.length > 6) {
        newDate += separator + strDate.substring(6, 8)
      }
      return newDate
    },
    // 获取月的最后一天 val:2018-08
    getMonthLastDay(val) {
      let m = new Date(val).getMonth() + 1
      let y = new Date(val).getFullYear()
      const _arr = [] // 存放下月的第一天
      m = m + 1
      if (m === 13) {
        m = '01'
        y++
      }
      _arr.push(y)
      _arr.push(m)
      _arr.push('01')
      const _last = this.showdate(-1, _arr.join('-'))
      return _last
    },
    // 初始化时间(今天)
    getInitToday() {
      const fmt = 'yyyy-MM-dd'
      const _d = new Date()
      const headTime = ' 00:00:00'
      const footTime = ' 23:59:59'
      const today = this.format(_d.getTime(), fmt)
      const beginTime = today + headTime
      const endTime = today + footTime
      const dateValue = [beginTime, endTime]
      return dateValue
    }
  },
  // 获取元素
  getEl: function (selector, parent) {
    if (parent && parent.querySelector) {
      return parent.querySelector(selector)
    }
    return document.querySelector(selector)
  },
  // 获取元素属性值
  getAttr: function (selector, attrName) {
    const tag = typeof selector === 'string' ? this.getEl(selector) : selector
    const attr = tag.attributes[attrName]
    return attr ? attr.value : ''
  },
  // 获取css元素属性值
  getStyle(selector, attrName) {
    const tag = typeof selector === 'string' ? this.getEl(selector) : selector
    let val = tag.style[attrName]
    if (!val) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        const cssObj = document.defaultView.getComputedStyle(tag)
        val = cssObj.getPropertyValue(attrName)
      } else {
        val = tag.currentStyle[attrName]
      }
    }
    return val.replace('px', '') * 1
  },
  // 字符串分割
  split(val, str = ',') {
    return typeof val === 'string' && val !== '' ? val.split(str) : []
  },
  // elementui表格合计栏颜色处理（暂无更好的方法）
  handlerTableSumClass() {
    // lastSumCls, newCls
    // let _q = '.' + lastSumCls
    // let els = document.querySelectorAll(_q)
    // if (els.length) {
    //   let el = els[els.length - 1].querySelector('div')
    //   let oCls = el.getAttribute('class')
    //   let reg = new RegExp(newCls)
    //   if (!reg.test(oCls)) {
    //     el.setAttribute('class', oCls + ' ' + newCls)
    //   }
    // }
  },
  // 文件下载(接入流数据)
  createFileDownload({ data, fileName, type = 'application/vnd.ms-excel' }) {
    const url = window.URL.createObjectURL(new Blob([data], { type }))
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    a.remove()
  },
  // 跳转登录页
  toLogin(isReURL) {
    // 判断是否有re了
    const hasRe = !!window.location.href.split('#/login/')[1]
    setTimeout(() => {
      window.location.href =
        window.domainConfig.main +
        '/#/login/' +
        (isReURL === false || hasRe
          ? ''
          : encodeURIComponent(window.location.href))
    }, 200)
    // 延时让postmessage清除登录信息成功
  },
  // 二维数组展开
  flatArr(arr) {
    const resultArr = []
    arr.forEach(x => {
      if (Array.isArray(x)) {
        x.forEach(y => {
          resultArr.push(y)
        })
      } else {
        resultArr.push(x)
      }
    })
    return resultArr
  },
  // 数据展开递归[1,2,3,[4,5,[7,8]]]-->[1,2,3,4,5,6,7,8]
  flatdeepArrs(arr) {
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
  },
  // 通过玩发名分组
  /**
   * @param {[]} arr
   * @param {{value, index}} callback f分组的key值
   */
  groupBy(arr, callback) {
    const map = new Map()
    const resultArr = []
    arr.forEach((value, index) => {
      const key = callback(value, index)
      const items = map.get(key) || []
      items.push(value)
      map.set(key, items)
    })
    map.forEach((value, key) => {
      resultArr.push({
        key,
        value
      })
    })
    return resultArr
  },
  // 数组去重
  unique(arr, fn) {
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
  },
  /**
   * @description: 金额默认保留两位小数，没有就00
   * @param {type} number
   * @return: string
   */
  formatMoney(num) {
    let n = parseFloat(num)
    if (isNaN(n)) {
      return false
    }
    n = Math.floor(n * 100) / 100
    let s = n.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  },
  // 移除完当前页表格数据后，请求上一页数据
  // 参数示例：pagecfg = {pageIdx:1,size:20,total:0}
  pageByRemoval(pageCfg) {
    const { pageIdx, size, total } = pageCfg
    const curTotal = total - 1
    const curPageIdx =
      Math.ceil(curTotal / size) < 1 ? 1 : Math.ceil(curTotal / size)
    return curPageIdx < pageIdx ? curPageIdx : pageIdx
  },
  // 输入金额控制(去除一些不合规则的字符)
  oninput(str) {
    const _str = str
      .replace(/(^00)/, '')
      .replace(/^[^\d]*(\d*\.?\d{0,2})(.*)?$/, '$1')
    if (_str.length >= 9) {
      return _str.substring(0, 9)
    }
    return _str
  },
  // 加法函数(防丢精度)
  accAdd(arg1, arg2) {
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
  },
  // 减法函数(防丢精度)
  subtr(arg1, arg2) {
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
  },
  // 乘法函数(防丢精度)
  accMul(arg1, arg2) {
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
  },
  // 除法函数(防丢精度)
  accDiv(arg1, arg2) {
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
  },
  // 获取日期
  getNowFormatDate(day) {
    const date = new Date()
    const befoDate = date.getTime() + 1000 * 60 * 60 * 24 * day
    date.setTime(befoDate)
    const seperator1 = '-'
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  },
  // 转化正常时间格式
  renderTime(date) {
    if (date !== undefined) {
      const dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    }
  }
}

export default util
export const htmlImgs = htmlStr => {
  let content = htmlStr
  if (/<img.src="(.*?)"/g.test(content)) {
    content = content.replace(/<img.src="(.*?)"/g, (match, key) => {
      return '<img src=' + img(key.trim())
    })
  }
  return content
}

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

/**
 * @param {[]} arr
 * @param {{value, index}} callback f分组的key值
 */
export const groupBy = (arr, callback) => {
  const map = new Map()
  const resultArr = []
  arr.forEach((value, index) => {
    const key = callback(value, index)
    const items = map.get(key) || []
    items.push(value)
    map.set(key, items)
  })
  map.forEach((value, key) => {
    resultArr.push({
      key,
      value
    })
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
  return accMul(r1 / r2, Math.pow(10, t2 - t1))
}
// 生产树结构
export const recursionTree = (menus, id = 0) => {
  let filterMenus = menus.filter(item => item.parentId === id)
  // 当有父级id却没有找到父级的时候则单独为一个菜单
  if (id === 0) {
    const noParentMenus = []
    const parentIdKeys = filterMenus.map(i => i.id)
    menus.map(item => {
      if (!parentIdKeys.includes(item.parentId) && item.parentId !== 0) {
        noParentMenus.push(item)
      }
    })
    filterMenus = filterMenus.concat(noParentMenus)
  }
  return filterMenus.map(item => ({
    ...item,
    children: recursionTree(menus, item.id)
  }))
}
export const copy = text => {
  const { isIos } = device
  const copyInput = document.createElement('input')
  copyInput.style.position = 'absolute'
  copyInput.style.left = '-999999px'
  copyInput.readOnly = true
  copyInput.setAttribute('value', text)
  document.body.appendChild(copyInput)
  copyInput.select()
  if (isIos) {
    window.getSelection().removeAllRanges()
    const range = document.createRange()
    range.selectNode(copyInput)
    window.getSelection().addRange(range)
    copyInput.setSelectionRange(0, text.length)
  }
  copyInput.blur()
  const copyState = document.execCommand('Copy')
  document.body.removeChild(copyInput)
  return copyState
}
/**
 * 处理小数点位数
 * @param  value
 * @param {*} n
 */
export const points = (value, n = 2) => {
  let valueStr = value + ''
  if (valueStr.indexOf('.') > -1) {
    valueStr += '00'
  } else {
    valueStr += '.000'
  }
  const regexp = new RegExp('([0-9]+.[0-9]{' + n + '})[0-9]*', 'g')
  return valueStr.replace(regexp, '$1')
}
// 获取网页宽高
export const getViewportSize = () => {
  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.height || document.documentElement.height || document.body.height
  }
}
