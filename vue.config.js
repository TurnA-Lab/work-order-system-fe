module.exports = {
	devServer: {
		open: true, //浏览器自动打开页面
		host: "0.0.0.0", //如果是真机测试，就使用这个IP
		port: 8080,
		proxy: {
			//配置跨域
			'^/api': {
				target: "http://localhost:8082",
				ws: true,
				changOrigin: true,
			}
		}
	}
}