import { Roles } from "@/static-data/roles";

export interface Item {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/**
 * 返回一个按权限从小到大排列的数组
 * @param roles 角色数组
 */
export const rolesInOrder: (roles: string[]) => string[] = roles =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles.sort((a, b) => (Roles as any)[a] - (Roles as any)[b]);

/**
 * 检测是否包含某数据
 * @param value
 * @param list 一个 Object[]
 * @param key Object 中的键
 */
export const includeInObject: (
  value: string | number,
  list: Item[],
  key: string
) => boolean = (value, list, key) => {
  for (let index = 0, length = list.length; index < length; index++) {
    const item = list[index];
    if (item[key] === value) {
      return false;
    }
  }
  return true;
};
