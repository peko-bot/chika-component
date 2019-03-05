/**
 *
 * @param {*} 根据字段排序，默认从小到达
 * @param {*} isDesc 是否倒序
 */
const compare = (property: any, isDesc = false) => {
  let ins = null;

  ins = isDesc
    ? (b: any, a: any) => a[property] - b[property]
    : (a: any, b: any) => a[property] - b[property];

  return ins;
};

export { compare };
