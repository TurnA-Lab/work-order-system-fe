export interface LabelList {
  key: number;
  value: string;
  label: string | number | boolean | null;
}

type Value2Label = undefined | { [value: string]: string | number | boolean };

/**
 * 返回对象 key 所对应的 value
 * @param obj 一个对象
 * @param key 对象的 key
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProp<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K
) {
  return obj[key];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (enumerator: any, value2Label?: Value2Label) => {
  const arr: LabelList[] = [];
  for (const key in enumerator) {
    // 如果拥有相应属性，且是数字
    if (
      Object.prototype.hasOwnProperty.call(enumerator, key) &&
      !isNaN(parseInt(key, 10))
    ) {
      arr.push({
        key: parseInt(key, 10),
        value: enumerator[key],
        label:
          typeof value2Label === "undefined"
            ? null
            : value2Label[enumerator[key]]
      });
    }
  }

  return arr;
};
