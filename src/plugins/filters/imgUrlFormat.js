export default url => {
  if (url) {
    if (url.indexOf('http') > -1) {
      return url
    }
    return window.AIConfig.static_url + url
  }
  return ''
}
