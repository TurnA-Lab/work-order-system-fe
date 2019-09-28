import Mock from "mockjs";
const Random = Mock.Random;

// 延时
Mock.setup({
	timeout: 800
});

const userData = {
	code: "1",
	msg: "",
	data: {
		name: Random.cname(),
		department: Random.cword(5),
		permission: Random.integer(0, 2),
		token: Random.word(80)
	}
};

Mock.mock("/login", "post", userData);