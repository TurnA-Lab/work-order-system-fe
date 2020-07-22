import { Roles } from "@/static-data/login";

interface Item {
  [key: string]: any;
}

/**
 * 简单的检测 item 是否全不为空。
 * @param item 接收一个 {key: value} 形式的对象。
 */
export const allNotNull: (item: Item) => boolean = item => {
  for (
    let index = 0, values = Object.values(item), length = values.length;
    index < length;
    index++
  ) {
    const value = values[index];
    if (value === "" || value === null || value === undefined) {
      return false;
    }
  }

  return true;
};

/**
 * 简单的检测 item 是否至少有一个不为空
 * @param item 接收一个 {key: value} 形式的对象。
 */
export const oneNotNull: (item: Item) => boolean = item => {
  for (
    let index = 0, values = Object.values(item), length = values.length;
    index < length;
    index++
  ) {
    const value = values[index];
    if (value === "" || value === null || value === undefined) {
      return true;
    }
  }

  return false;
};

/**
 * 检测字符串是否可以转换为 JSON
 * @param str JSON 字符串
 */
export const strIsJSON: (str: string) => boolean = str => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      return typeof obj === "object" && obj;
    } catch (err) {
      return false;
    }
  } else {
    throw new TypeError(str + " 不是一个 string");
  }
};

export const rolesInOrder: (roles: string[]) => string[] = roles =>
  roles.sort((a, b) => (Roles as any)[a] - (Roles as any)[b]);
