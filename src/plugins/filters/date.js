export default (source, pattern = 'yyyy-MM-dd HH:mm:ss') => {
  let dateTime = source
  if (!source) {
    return ''
  }

  if (typeof source === 'number') {
    dateTime = new Date(source)
  }

  dateTime = new Date(source)
  const dateFields = {
    yy: dateTime.getFullYear() % 100,
    yyyy: dateTime.getFullYear(),
    M: dateTime.getMonth() + 1,
    MM: dateTime.getMonth() + 1,
    d: dateTime.getDate(),
    dd: dateTime.getDate(),
    h: dateTime.getHours() % 12,
    hh: dateTime.getHours() % 12,
    H: dateTime.getHours(),
    HH: dateTime.getHours(),
    m: dateTime.getMinutes(),
    mm: dateTime.getMinutes(),
    s: dateTime.getSeconds(),
    ss: dateTime.getSeconds()
  }

  return pattern.replace(/yyyy|yy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s/g, fm => {
    const value = dateFields[fm]
    if (fm.length === 1) {
      return value
    }
    return `0000${value}`.substr(-fm.length)
  })
}
