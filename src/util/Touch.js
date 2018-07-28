/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-05 17:01:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 09:32:09
 */
// 根据起点终点返回方向
const getDirection = (startX, startY, endX, endY) => {
	let angx = endX - startX;
	let angy = endY - startY;
	let result = '我一直站在此处没有动，等你买橘回来给我付车费';

	// 如果滑动距离太短
	if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
		return result;
	}

	let angle = Math.atan2(angy, angx) * 180 / Math.PI;

	if (angle >= -135 && angle <= -45) {
		result = 'toTop';
	} else if (angle > 45 && angle < 135) {
		result = 'toDown';
	} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		result = 'toLeft';
	} else if (angle >= -45 && angle <= 45) {
		result = 'toRight';
	}

	return result;
};

// 绑定 判断滑动方向 事件
const bindTouchDirection = (ref, callback) => {
	let startX, startY, endX, endY;

	ref.addEventListener('touchstart', e => {
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY;
	});

	ref.addEventListener('touchend', e => {
		endX = e.changedTouches[0].pageX;
		endY = e.changedTouches[0].pageY;

		let direction = getDirection(startX, startY, endX, endY);

		callback(direction);
	});
};

module.exports = { bindTouchDirection };