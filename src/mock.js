import Mock from "mockjs";
const Random = Mock.Random;

// 延时
Mock.setup({
	timeout: 800
});


// 实际 password 应在 man 中
const man = {
	worknum: "111111",
	permission: "0",
	name: "郝未来",
	sex: "男",
	birthDate: "1970年10月1日",
	entranceDate: "2010年10月1日",
	jobTitle: "教授",
	topEducation: "博士研究生毕业",
	topDegree: "博士",
	graduatedSchool: "清华",
	profession: "计算机科学",
	phoneNum: "13788888888",
	department: "张家港江苏科技大学产业技术研究院",
	departmentNum: "301",
};
const token = "nuhbxjfcyldwssqxcrdhjqacwmanlmgvphqggdclnjgliihlonwchsvqflhltwkanxypuhcytnebjfwy";
let password = "222222";


Mock.mock("/login", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.password === password && reqBody.worknum === man.worknum && reqBody.permission === man.permission) {
		return {
			code: 1,
			msg: "",
			data: {
				name: man.name,
				department: man.department,
				permission: man.permission,
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

Mock.mock("/userInfo", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: man
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
	if (reqBody.oldPassword === password && reqBody.token === token && reqBody.newPassword !== null) {
		// newPassword 应做进一步检验
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