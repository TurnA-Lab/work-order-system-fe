interface Item {
  [key: string]: any
}

export default (item: Item) => {
  console.log(item);

  for (const key of Object.keys(item)) {
    if (item[key] === "" || item[key] === null) {
      return false;
    }
  }

  return true;
}