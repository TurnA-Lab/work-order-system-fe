// 这么烂的实现肯定不是我想出来的……是 lt 的锅

const yearRange: string[] = [];

for (let i = 0; i < 50; i++) {
  yearRange.push(
    `20${i < 10 ? "0" + i : i}-20${i < 9 ? "0" + (i + 1) : i + 1}`
  );
}

export default yearRange;
