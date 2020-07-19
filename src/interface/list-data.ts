// 院部
export interface Department {
  id: number; // 唯一标识
  dptId: string; // 科室标识
  dptName: string; // 科室名
}

// 用户工单共有属性
interface RawWorkOrder {
  id: number; //唯一标识
  class1: string; // 顶级类别
  class2: string; // 二级类别
  class3: string; // 三级类别
  year: string; // 年度
  schoolYear: string; // 学年

  createTime: string; // 创建时间
  updateTime: string | null; // 修改时间
  status: number; // 状态
  isDeleted: boolean; // 是否被删除
  testimonial: string; // 佐证材料，文件 JSON 字符串
  reason: string; // 未通过原因

  name: string; // 用户名（第一负责人）
  worknum: string; // 用户工号（第一负责人工号）
  dptName: string; // 用户所属科室（第一负责人所属科室）
  teammate: string; // 其他成员
}

// 建设类
export interface Construction extends RawWorkOrder {
  bonus: number; //奖励
  point: number;
  computeYear: string;
  expenditure: string; // 建设经费
  fileNum: string; // 文件数？
  isEnd: number; // 是否结束
  level: string; // 项目级别
  project: string; //项目名称
  projectNum: string; //项目编号？
  sponsor: string; //主办单位
  startingAndEnding: string; // 起止日期
}

// 成果类
export interface Achievement extends RawWorkOrder {
  isUsed: number; // 是否被使用
  production: string; // 成果名
  publishTime: number; // 出版时间，类似 2014-11-01
  unit: string; // 发表刊物/出版社/授权单位
}

// 获奖类
export interface Award extends RawWorkOrder {
  content: string; // 获奖名称
  awardTime: string; // 获奖时间
  awardUnit: string; // 颁奖单位
  awardYear: string; // 获奖年度？
  level: string; // 级别
  prize: string; // 奖项
}

// 某些简单的接口，不知道咋命名
interface RawSimple {
  id: number;
  label: string;
}

// 奖项
export type Prize = RawSimple;
// 级别
export type Level = RawSimple;

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}
