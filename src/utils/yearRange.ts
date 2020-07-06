// 这么烂的实现肯定不是我想出来的……是 lt 的锅

// 年度范围
const yearRange: string[] = [];

for (let i = 0; i < 50; i++) {
  const year = 2000 + i;
  yearRange.push(year.toString() + "-" + (year + 1).toString());
}

export default yearRange;
