/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:48:49 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-10-30 22:12:24
 */

module.exports = {
	publicPath: process.env.NODE_ENV === "production" ?
		"/work-order-system-fe/" :
		"/",
	devServer: {
		open: true, //浏览器自动打开页面
		host: "0.0.0.0", //如果是真机测试，就使用这个IP
		port: 8080,
		proxy: {
			//配置跨域
			"^/api": {
				target: "https://mock.iskye.cn/mock/5db59f1e8f24873a3f40f16e",
				ws: true,
				changOrigin: true,
			}
		}
	}
}