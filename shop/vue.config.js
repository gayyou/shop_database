const webpack = require("webpack");
const path = require('path');
const WebpackAliyunOss = require('webpack-aliyun-oss');
const oss = require('./oss-config.js');

module.exports = {
  publicPath: './',
  // publicPath: process.env.NODE_ENV === 'production' ? 'https://qg-oss-static.oss-cn-shenzhen.aliyuncs.com/kaola-static/': './',
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 下面为代理服务器配置
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',          // 目标服务器的基础地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    // 本地静态资源路径映射，将本地的静态资源映射为@assets
    config.resolve.alias
      ['@assets'] = path.join(__dirname, "src/assets");
    config.resolve.alias
      ['@views'] = path.join(__dirname, "src/views");
    if (process.env.NODE_ENV === 'production') {
      // 接下来是进行oss自动上传处理
      let webpackAliyunOss = [
        // new WebpackAliyunOss({
        //   form: ['./dist/**', '!./dist/**/*.html'],  // 将文件进行处理后上传的文件夹
        //   dist: 'kaola-static',
        //   accessKeyId: oss.accessKeyId,
        //   accessKeySecret: oss.accessKeySecret,
        //   region: oss.region,
        //   bucket: oss.bucket,
        //   test: true
        // })
      ];
      // config.plugins = [...config.plugins, ...webpackAliyunOss ];
    }
  },
  // 构建时开启多进程处理 babel 编译
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,
  // 编译scss文件
  pluginOptions: {
    'sass-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/*.scss')
      ]
    }
  },
  css:{
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-plugin-px2rem')({
            rootValue: 100, // 换算基数，把根标签的字体规定为1rem为100px
            unitPrecision: 8, // 允许REM单位增长到的十进制数字。
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('scss', path.join(__dirname, "src/styles"))
  }
};
