/*
 * @Author: Skye Young
 * @Date: 2019-12-01 16:27:05
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-01 16:33:26
 */

const yearRange: string[] = [];

for (let i = 0; i < 50; i++) {
  yearRange.push(`20${i < 10 ? "0" + i : i}-20${i < 9 ? "0" + (i + 1) : (i + 1)}`);
}

export default yearRange;
