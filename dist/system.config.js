/* eslint-disable camelcase */

;(function() {
  const host = location.hostname
  let static_url =
    location.protocol +
    '//' +
    (location.hostname.split('.').length === 3
      ? location.hostname.replace(location.hostname.split('.')[0], 'img')
      : location.hostname.replace(location.hostname.split('.')[1], 'img')) +
    '/'
  let player_url = location.origin + '/'
  let push_url = location.origin + '/'
  if (host.indexOf('localhost') > -1 || host.indexOf('192.168') > -1) {
    static_url = 'http://dev.img.xc.com/'
    // static_url = 'http://img.xcspt.com/'
    // static_url = 'https://img.asp899.com'
    player_url = 'http://dev.m.xc.com/'
    push_url = 'http://dev.m.xc.com/'
  }
  // 根据langMold配置获取不同语言包,true为最新语言包,false为旧语言包
  window.AIConfig = {
    cdn: true,
    player_url,
    static_url,
    push_url,
    langMold: false,
    api_url: 'http://fat.m.xc.com/',
    V: 3.2
  }
})()
