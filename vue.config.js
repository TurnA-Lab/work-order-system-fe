module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `
                  @import "@/stylesheet/default.scss";
        `
      }
    }
  },
  devServer: {
    open: true, //浏览器自动打开页面
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 8080,
    proxy: {
      //配置跨域
      "^/api": {
        target: "http://134.175.59.87:8082",
        // target: "http://10.3.4.18",
        // target: "http://127.0.0.1:8082",
        ws: true,
        changOrigin: true
      },
      "^/local": {
        target: "http://127.0.0.1:3000",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/local": ""
        }
      }
    }
  }
};
