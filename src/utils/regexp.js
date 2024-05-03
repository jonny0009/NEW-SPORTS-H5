// 正则
export const required = /^\S*$/
export const en = /^[a-zA-Z\s]*$/
export const en_ = /^[a-zA-Z\s_]*$/
export const zh = /^[\u0391-\uFFE5]*$/
export const integer = /^[1-9]+\d*$/ // 正整数
export const number = /^\d*$/ // 数字
export const money = /^-*\d*(\.\d{1,2})?$/ // 金额
export const floatNumber = /^-*\d*(\.\d{1,})?$/ // 能为负小数数字
export const posFloatNumber = /^\d*(\.\d{1,})?$/ // 不能为负的小数数字
export const FloatOneNumber = /^\d*(\.\d{1})?$/ // 只能位一位小数点
export const positiveMoney = /^\d*(\.\d{1,2})?$/ // 不能为负的金额
export const url = /^(https?|s?ftp):\/\/\S+$/i
export const strongPassword = /^(?=.{8,})(((?=.*[A-Za-z])(?=.*[0-9]))).*$/ // 强密码 8-20位字符，至少要有字母和数字组合
// eslint-disable-next-line no-useless-escape
export const email = /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i
export const account = /^[a-zA-Z]+[a-zA-Z0-9_]{5,19}$/ // 6-20位字母、数字、下划线，且以字母开头
export const sort = /^\d*(\.\d{1,2})?$/ // 允许2位小数
// eslint-disable-next-line no-useless-escape
export const emailOrPhone = /((^\d+$)|(^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$))/ // 邮箱或者号码
export const moreMoney = /^[1-9]*(\.\d{1,2})?$/ // 大于0的金额
