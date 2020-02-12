interface Item {
  [key: string]: any;
}

/**
 * 简单的检测 item 是否不为空。
 * @param item 接收一个 {key: value} 形式的对象。
 */
const validate: (item: Item) => boolean = (item) => {
  // console.log(item);

  for (const key of Object.keys(item)) {
    if (item[key] === "" || item[key] === null) {
      return false;
    }
  }

  return true;
};

export default validate;
