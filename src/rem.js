import localStore from '@/utils/localStore'
import store from '@/store'
var timer = null
// var de = document.documentElement
var descreenWidth = document.body.clientWidth

var deToggle = true
function setRootFontSize() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    // var deWidth = de.clientWidth
    var isMobile =
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser)/i.test(
        navigator.userAgent
      )
    var documentClientWidth = document.body.clientWidth

    // start isPC
    if (descreenWidth !== documentClientWidth || deToggle) {
      deToggle = false
      descreenWidth = documentClientWidth
      if (!isMobile) {
        store.dispatch('app/setIsPC', true)
        localStore.setItem('isPC', true)
      } else {
        store.dispatch('app/setIsPC', false)
        localStore.setItem('isPC', false)
      }
    }
    // end isPC
    // if (deWidth < 1240) {
    // if (!isMobile) {
    //   deWidth = Math.min(deWidth, 375)
    // }
    // 当超过适配值时,设定最大值为 115
    // const fontSizeVal = 100 * (deWidth / 375)
    // de.style.cssText =
    //   'font-size:' + (fontSizeVal > 115 ? 115 : fontSizeVal) + 'px'
    // } else {
    // de.style.cssText = 'font-size:100px'
    // }
    //
    store.dispatch('app/setClientWidth', documentClientWidth)
    //
  }, 400)
}

window.addEventListener('resize', setRootFontSize)
setRootFontSize()
