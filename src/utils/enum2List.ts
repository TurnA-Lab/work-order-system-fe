export interface LabelList {
  key: number;
  value: string;
  label: string | null;
}

type Value2Label = undefined | { [value: string]: string };

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
