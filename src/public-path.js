/* eslint-disable camelcase */
if (window.AIConfig.cdn && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = `${window.AIConfig.static_url}/FE/common/web/newh5/`
}
