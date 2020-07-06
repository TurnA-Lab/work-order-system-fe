interface Item {
  [key: string]: any;
}

/**
 * 简单的检测 item 是否全不为空。
 * @param item 接收一个 {key: value} 形式的对象。
 */
export const allNotNull: (item: Item) => boolean = (item) => {
  for (
    let index = 0, values = Object.values(item), length = values.length;
    index < length;
    index++
  ) {
    const value = values[index];
    if (value === "" || value === null) {
      return false;
    }
  }

  return true;
};

/**
 * 简单的检测 item 是否至少有一个不为空
 * @param item 接收一个 {key: value} 形式的对象。
 */
export const oneNotNull: (item: Item) => boolean = (item) => {
  for (
    let index = 0, values = Object.values(item), length = values.length;
    index < length;
    index++
  ) {
    const value = values[index];
    if (value === "" || value === null) {
      return true;
    }
  }

  return false;
};
