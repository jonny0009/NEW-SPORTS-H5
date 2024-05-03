/**
 * app相关配置
 */
import locales from '@/i18n/locales'
const { cn } = locales
const langMap = {
  'zh-cn': cn
}
export default {
  langMap,

  // 接口调用超时时间
  apiTimeout: 15000,
  // 推送心跳间隔时间
  pushAliveTime: 30000,
  // 推送重连时间
  pushReconnectTime: 35000,
  // 推送连接重试次数
  pushRetryTimes: 5,

  langValueMapping: {
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    'en-us': 'en-us',
    'vi-vn': 'vi-vn',
    'th-th': 'th-th',
    'pt-pt': 'pt-pt'
  },
  langMapping: {
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    'en-us': 'en-us',
    'vi-vn': 'vi-vn',
    'th-th': 'th-th',
    'pt-pt': 'pt-pt'
  }
}
