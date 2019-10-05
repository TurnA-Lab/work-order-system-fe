import Mock from "mockjs";
const Random = Mock.Random;

// 延时
Mock.setup({
	timeout: 800
});

const worknum = "1111";
const name = "郝未来";
const department = "张家港江苏科技大学产业技术研究院";
const permission = "0";
const token = "nuhbxjfcyldwssqxcrdhjqacwmanlmgvphqggdclnjgliihlonwchsvqflhltwkanxypuhcytnebjfwy";

let password = "2222";


Mock.mock("/login", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.password === password && reqBody.worknum === worknum && reqBody.permission === permission) {
		return {
			code: 1,
			msg: "",
			data: {
				name: name,
				department: department,
				permission: permission,
				token: token
			}
		};
	} else {
		return {
			code: -1,
			msg: "帐号、密码或权限出现错误",
			data: {}
		};
	}
});

Mock.mock("/password", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.password === password && reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: {}
		};
	} else {
		return {
			code: -1,
			msg: "原密码错误",
			data: {}
		};
	}
});

Mock.mock("/newPassword", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.password === password && reqBody.token === token && reqBody.password !== null) {
		password = reqBody.newPassword;
		return {
			code: 1,
			msg: "",
			data: {}
		};
	} else {
		return {
			code: -1,
			msg: "由于未知因素，暂时无法设置，请稍候再试",
			data: {}
		};
	}
});