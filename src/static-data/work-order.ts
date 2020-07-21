import enum2List from "@/utils/enum2List";

// 审核状态
export enum Status {
  "未通过",
  "审核中",
  "学院通过",
  "科室通过"
}

export const statusList = enum2List(Status);

// 是否结束
export enum EndStatus {
  "未结束",
  "已结束"
}

export const endStatusList = enum2List(EndStatus);

// 年度范围
// 这么烂的实现肯定不是我想出来的……是 lt 的锅
const years = () => {
  const arr: string[] = [];

  for (let i = 0; i < 50; i++) {
    const year = 2000 + i;
    arr.push(year.toString() + "-" + (year + 1).toString());
  }

  return arr;
};

export const yearList: string[] = years();

// 计算科室
export const computeOffice = [
  "教务科",
  "实验室与设备管理科",
  "团委",
  "质量建设与评估办公室",
  "实践教学科",
  "学籍科"
];

// 是否
// 用于 tutor background doubleTeacher isUsed
export enum noOrYes {
  "否",
  "是"
}

export const noOrYesList = enum2List(noOrYes);
