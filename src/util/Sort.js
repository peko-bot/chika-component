/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-12 08:43:04
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-12 08:43:30
 */
/**
 *
 * @param {*} 根据字段排序，默认从小到达
 * @param {*} isDesc 是否倒序
 */
const compare = (property, isDesc = false) => {
	let ins = null;

	ins = isDesc ? (b, a) => (a[property] - b[property]) : (a, b) => (a[property] - b[property]);

	return ins;
};

module.exports = { compare };