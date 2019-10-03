import Mock from "mockjs";
const Random = Mock.Random;

// 延时
Mock.setup({
	timeout: 800
});

const userData = {
	code: Random.integer(-1, 1),
	msg: Random.csentence,
	data: {
		name: Random.cname(),
		department: Random.cword(5),
		permission: 0,
		token: Random.word(80)
	}
};

Mock.mock("/login", "post", userData);