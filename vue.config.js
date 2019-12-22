/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:49
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-18 10:08:31
 */

module.exports = {
	publicPath: "/dist/",
	devServer: {
		open: true, //浏览器自动打开页面
		host: "0.0.0.0", //如果是真机测试，就使用这个IP
		port: 8080,
		proxy: {
			//配置跨域
			"^/api": {
				// target: "http://134.175.59.87:8082",
				target: "http://127.0.0.1:8082",
				ws: true,
				changOrigin: true,
			},
			"^/local": {
				target: "http://127.0.0.1:3000",
				ws: true,
				changOrigin: true,
				pathRewrite: {
					'^/local': ''
				}
			}
		}
	}
};
