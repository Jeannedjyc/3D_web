const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 3001,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Authorization" :"Basic Y29tbWE6Y29tbWE=",
    //   "Auth-Sub" :"user",
    //   "Cookie" :"JSESSIONID=Zfoh5ERu9RrhTfZfFWZyKu6orHARhhJVL2kFLjee"
    // },
    proxy: {
      '/api': {
          target: 'http://192.168.1.238:8000',//后端接口地址
          changeOrigin: true,//是否允许跨越
          pathRewrite: {
              '^/api': ''//
          }
      }
    }
  },
});
