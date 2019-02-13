/**
 *
 * @param {*} 根据字段排序，默认从小到达
 * @param {*} isDesc 是否倒序
 */
const compare = (property, isDesc = false) => {
  let ins = null;

  ins = isDesc
    ? (b, a) => a[property] - b[property]
    : (a, b) => a[property] - b[property];

  return ins;
};

module.exports = { compare };
