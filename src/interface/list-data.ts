// 院部
export interface Department {
  id: number;
  dptId: string;
  dptName: string;
}

// 建设类
export interface Construction {
  bonus: number;
  class1: string;
  class2: string;
  class3: string;
  computeYear: string;
  createTime: string;
  dptName: string;
  expenditure: string;
  fileNum: string;
  id: number;
  isDeleted: boolean;
  isEnd: number;
  level: string;
  name: string;
  point: number;
  project: string;
  projectNum: string;
  reason: string;
  schoolYear: string;
  sponsor: string;
  startTime: string;
  startingAndEnding: string;
  status: number | string;
  teammate: string;
  testimonial: string;
  updateTime: string;
  worknum: string;
  year: string;
}

export interface Award {
  awardTime: string;
  awardUnit: string;
  awardYear: string;
  bonus: number;
  class1: string;
  class2: string;
  class3: string;
  content: string;
  createTime: string;
  dptName: string;
  id: number;
  isDeleted: boolean;
  level: string;
  name: string;
  prize: string;
  reason: string;
  schoolYear: string;
  status: number | string;
  teammate: string;
  testimonial: string;
  updateTime: string;
  worknum: string;
  year: string;
}
