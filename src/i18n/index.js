import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import AppConfig from '@/config/business.config.js'
import { StorageKey } from '@/config/constants'
import locales from './locales'
import { getBrowserLanguage } from '@/utils/util'
// vue-i18n
Vue.use(VueI18n)
const { cn, ko, en, vi, th, tw, pt } = locales
const { langValueMapping } = AppConfig
/**
 * 获取默认语言
 */
export const getDefaultLanguage = () => {
  const lang = localStorage.getItem(StorageKey.LANG) || getBrowserLanguage()
  return lang
}

/**
 * 加载语言包
 *
 * @param {string} lang
 *    当前语言
 */
const loadLocaleResource = lang => {
  const langPack = {
    'zh-cn': cn,
    'zh-tw': tw,
    'en-us': en,
    'ko-kr': ko,
    'vi-vn': vi,
    'th-th': th,
    'pt-pt': pt
  }
  return langPack[lang]
}

/**
 * 为页面设置对应语言
 *
 * @param {string} lang
 *       语言值
 */
const setPageLanguage = lang => {
  if (lang) {
    localStorage.setItem(StorageKey.LANG, lang)
    axios.defaults.headers.common['Accept-Language'] = lang
    window.lang = lang
  }
}

// vue-i18n的实例对象
let i18nInstance
/**
 * 初始化vue需要绑定的i18n对象
 */
export const initI18n = () => {
  if (i18nInstance) {
    return i18nInstance
  }
  const lang = getDefaultLanguage()
  i18nInstance = new VueI18n({
    locale: lang,
    fallbackLocale: lang,
    messages: {
      [lang]: loadLocaleResource(lang)
    }
  })
  setPageLanguage(lang)

  window.i18n = i18nInstance
  return i18nInstance
}

/**
 * 获取当前所使用的语言
 */
export const getLang = () =>
  i18nInstance ? i18nInstance.locale : AppConfig.setting.lang
/**
 * 获取当前语言的具体值
 * 1: zh 中文简体
 * 2: zht 中文繁軆
 * 3: en English
 */
export const getLangValue = () =>
  langValueMapping[getLang()] || getDefaultLanguage()

/**
 * 重新设置语言
 *
 * @param {string} lang
 *      最新语言环境
 */
export const setLanguage = async lang => {
  if (!i18nInstance) {
    return
  }

  if (!i18nInstance.messages[lang]) {
    i18nInstance.setLocaleMessage(lang, await loadLocaleResource(lang))
  }

  i18nInstance.locale = lang
  setPageLanguage(lang)
}
