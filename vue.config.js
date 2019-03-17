module.exports = {
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径, baseUrl 已被官方不建议使用

  devServer: {
    // host: 'localhost',
    port: 9527,
    open: process.platform === 'darwin', //配置自动启动浏览器
    https: false,
    hotOnly: false,
    proxy: { // 跨域请求代理 https://www.cnblogs.com/cckui/p/10331432.html
      '/api': {
        target: 'http://127.0.0.1:8888/', // 接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
   },
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件

  //  configureWebpack: {
  //   performance:{ // webpack打包压缩限制报错这里禁掉这个warning信息
  //     hints: false
  //   }
  // }
}
