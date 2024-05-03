const path = require('path')
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
var createJson = function (comilation) {
  process.env.HASH = comilation.hash
  return JSON.stringify({ HASH: comilation.hash })
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
let target = ''
target = target + ''
//
// ai juxiangbaojie
// target = 'https://7lucky.juxiangbaojie.com'
//
// ai cn2
// target = 'http://cn2.h5-365.aisports.io/'
//
// ai dev
// target = 'http://dev.h5-365.xc.com'
//
// 98官网 dev
// target = 'http://dev.h502-365.xc.com/'
//
// 98官网 cn2
// target = 'http://cn2.h504-365.aisports.io/'
//
// sharpsports
// target = 'https://sharpsports.improveperson.com'
target = 'http://cn2.new-sports-h5.aisports.io'
//
// const port = 8088
const port = 8080
module.exports = {
  assetsDir: 'assets',
  publicPath: '/start/',

  productionSourceMap: false,
  configureWebpack: config => {
    config.plugins.push(
      new GenerateAssetPlugin({
        filename: 'hash.json',
        fn: (comilation, cb) => {
          cb(null, createJson(comilation))
        },
        extraFiles: []
      })
    )
  },
  chainWebpack: config => {
    // 修改项目入口文件
    config.entry('app').clear().add('./src/setup.js')

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          audio: 'src'
        }
        options.compilerOptions.directives = {
          html(node, directiveMeta) {
            ;(node.props || (node.props = [])).push({
              name: 'innerHTML',
              value: `xss(_s(${directiveMeta.value}))`
            })
          }
        }
        return options
      })
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.resolve.alias.set('@libs', 'xcsport-lib')
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('autoprefixer')(),
  //         require('postcss-plugin-px2rem')({
  //           rootValue: 100, // 换算基数 默认100
  //           exclude: /(node_module)/,
  //           mediaQuery: false,
  //           minPixelValue: 2 // 设置要替换的最小像素值 默认0
  //         })
  //       ]
  //     }
  //   }
  // },
  devServer: {
    port,
    proxy: {
      '/ai': {
        target,
        changeOrigin: true,
        xfwd: false,
        ws: true,
        pathRewrite: {
          // '^/ai': '/gbet/mobile'
          '^/ai': '/ai/mobile'
        },
        headers: {
          Referer: target
        }
      },
      '/gchat': {
        target,
        changeOrigin: true,
        xfwd: false,
        ws: true
      },
      '/chat': {
        target,
        changeOrigin: true,
        xfwd: false,
        ws: true
      },
      '/odds/api': {
        target,
        changeOrigin: true,
        xfwd: false,
        ws: true
      }
    }
  }
}
