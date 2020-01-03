'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      /*
      将api的请求转发到业务服务器上
       */
      '/api':{
        // target:'http://10.103.252.26:8001/',
        target: 'http://localhost:3298/',
        // secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin:true,

        pathReWrite:{
          '^/api':'/api'
        }
      },
      /*
      将arcgis相关的请求转发到gis server服务器上
       */
      '/arcgis':{
        target:'http://10.103.252.26:80/',
        // target:'http://localhost:6080/',
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin:true,
        pathReWrite:{
          '^/arcgis':'/arcgis'
        }
    },
      '/arcgis_js_api':{
        target:'http://localhost:80',
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin:true,
        pathReWrite:{
          '^/arcgis_js_api':'/arcgis_js_api'
        }
      },
    },
    '/DotNet':{
      target:'http://10.103.252.26:80/',
      // target:'http://localhost:6080/',
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin:true,
      pathReWrite:{
        '^/DotNet':'/DotNet'
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
