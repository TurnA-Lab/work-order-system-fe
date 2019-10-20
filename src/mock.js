import Mock from "mockjs";
const Random = Mock.Random;

// 延时
Mock.setup({
	timeout: 800
});

// 工具人
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

/**
 * 登录页
 */

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


/**
 * 用户资料页
 */

// 账户信息
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

// 修改密码
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


/**
 * 工单提交页 
 */

Mock.mock("/departmentList", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: [{
					label: "党政办公室",
					value: 1
				},
				{
					label: "公共教育学院",
					value: 24
				},
				{
					label: "冶金与材料工程学院",
					value: 23
				},
				{
					label: "商学院",
					value: 22
				},
				{
					label: "团委",
					value: 10
				},
				{
					label: "图书馆",
					value: 15
				},
				{
					label: "外事办",
					value: 11
				},
				{
					label: "学生处",
					value: 9
				},
				{
					label: "学籍与考试科",
					value: 5
				},
				{
					label: "实践教学管理科",
					value: 6
				},
				{
					label: "实验室与设备管理科",
					value: 8
				},
				{
					label: "工会(挂靠党政办公室)",
					value: 2
				},
				{
					label: "工程训练中心（挂靠科技与产业合作处）",
					value: 28
				},
				{
					label: "张家港市产学研合作促进会",
					value: 26
				},
				{
					label: "张家港市香樟树众创空间服务中心",
					value: 27
				},
				{
					label: "张家港江苏科技大学产业技术研究院",
					value: 25
				},
				{
					label: "招生办公室（与学生处合署）",
					value: 17
				},
				{
					label: "教务处",
					value: 3
				},
				{
					label: "教务科",
					value: 4
				},
				{
					label: "教师教学发展中心",
					value: 18
				},
				{
					label: "机电与动力工程学院",
					value: 20
				},
				{
					label: "电气与信息工程学院",
					value: 21
				},
				{
					label: "科技与产业合作处",
					value: 12
				},
				{
					label: "综合保障处",
					value: 14
				},
				{
					label: "网络信息中心",
					value: 16
				},
				{
					label: "船舶与建筑工程学院",
					value: 19
				},
				{
					label: "财务处",
					value: 13
				},
				{
					label: "质量建设与评估办公室",
					value: 7
				}
			]
		};
	} else {
		return {
			code: -1,
			msg: "由于未知因素，暂时无法获取数据，请稍候再试",
			data: {}
		};
	}
});

Mock.mock("/sortList", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: [{
					label: "教改教研",
					value: "1",
					children: [{
							label: "国家级教学改革研究课题",
							value: 1
						},
						{
							label: "全国教育科学规划课题国家级课题",
							value: 2
						},
						{
							label: "国家级教学改革研究课题（一般）",
							value: 3
						},
						{
							label: "全国教育科学规划课题教育部课题",
							value: 4
						},
						{
							label: "江苏省教学改革研究课题（重中之重）",
							value: 5
						},
						{
							label: "江苏省教学改革研究课题（重点）",
							value: 6
						},
						{
							label: "江苏省教学改革研究课题（一般）",
							value: 7
						},
						{
							label: "江苏省教育科学规划课题",
							value: 8
						},
						{
							label: "江苏省研究生教育教学改革研究与实践课题",
							value: 9
						},
						{
							label: "江苏省信息化课题",
							value: 10
						},
						{
							label: "镇江市教育专项课题",
							value: 11
						},
						{
							label: "江苏科技大学教学改革研究课题",
							value: 12
						},
						{
							label: "苏理工教学改革研究课题-重点",
							value: 13
						},
						{
							label: "苏理工教学改革研究课题-一般",
							value: 14
						}
					]
				},
				{
					label: "教师团队",
					value: 2,
					children: [{
							label: "江苏科技大学优秀教师团队",
							value: 1
						},
						{
							label: "苏州市优秀教师团队",
							value: 2
						}
					]
				},
				{
					label: "专业建设",
					value: 3,
					children: [{
							label: "品牌专业",
							value: 1
						},
						{
							label: "重点专业",
							value: 2
						},
						{
							label: "专业建设业绩分",
							value: 3
						}
					]
				},
				{
					label: "课程建设",
					value: 4,
					children: [{
							label: "教改示范课程",
							value: 1
						},
						{
							label: "在线开放课程",
							value: 2
						}
					]
				},
				{
					label: "教材建设",
					value: 5,
					children: [{
							label: "讲义",
							value: 1
						},
						{
							label: "教材",
							value: 2
						},
						{
							label: "百科教材",
							value: 3
						}
					]
				},
				{
					label: "高教研究",
					value: 6,
					children: [{
							label: "全国教育科学研究规划课题",
							value: 1
						},
						{
							label: "全国教育信息技术研究课题",
							value: 2
						},
						{
							label: "高等教育科学研究规划课题",
							value: 3
						},
						{
							label: "江苏省教育科学规划课题",
							value: 4
						},
						{
							label: "教育改革发展战略性与政策性研究课题",
							value: 5
						},
						{
							label: "江苏省高等教育科学研究规划课题",
							value: 6
						},
						{
							label: "江苏省教育信息化课题",
							value: 7
						},
						{
							label: "镇江市教育专项",
							value: 8
						},
						{
							label: "江苏科技大学高等教育科学研究课题",
							value: 9
						},
						{
							label: "江苏省现代教育技术研究课题",
							value: 10
						}
					]
				}
			]
		};
	} else {
		return {
			code: -1,
			msg: "由于未知因素，暂时无法获取数据，请稍候再试",
			data: {}
		};
	}
});

Mock.mock("/rankList", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: [{
					label: "无",
					value: 0
				},
				{
					label: "江科大",
					value: 1
				},
				{
					label: "苏理工",
					value: 2
				},
				{
					label: "市级",
					value: 3
				},
				{
					label: "省部级",
					value: 4
				},
				{
					label: "国家级",
					value: 5
				},
				{
					label: "其他类",
					value: 6
				},
			]
		};
	} else {
		return {
			code: -1,
			msg: "由于未知因素，暂时无法获取数据，请稍候再试",
			data: {}
		}
	}
});

Mock.mock("/principalWorknum", "post", (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token && reqBody.worknum === man.worknum) {
		return {
			code: 1,
			msg: "",
			data: {}
		}
	} else {
		return {
			code: -1,
			msg: "",
			data: {}
		}
	}
});


const newForm = (options) => {
	const reqBody = JSON.parse(options.body);
	if (reqBody.token === token) {
		return {
			code: 1,
			msg: "",
			data: {}
		}
	} else {
		return {
			code: -1,
			msg: "",
			data: {}
		}
	}
};

Mock.mock("/newForm1", "post", newForm);
Mock.mock("/newForm2", "post", newForm);
Mock.mock("/newForm3", "post", newForm);