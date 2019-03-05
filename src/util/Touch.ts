// 根据起点终点返回方向
const getDirection = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) => {
  let angx = endX - startX;
  let angy = endY - startY;

  // 如果滑动距离太短
  if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
    return '';
  }

  let angle = (Math.atan2(angy, angx) * 180) / Math.PI;

  if (angle >= -135 && angle <= -45) {
    return 'toTop';
  } else if (angle > 45 && angle < 135) {
    return 'toDown';
  } else if (
    (angle >= 135 && angle <= 180) ||
    (angle >= -180 && angle < -135)
  ) {
    return 'toLeft';
  } else if (angle >= -45 && angle <= 45) {
    return 'toRight';
  }
  return '';
};

// 绑定 判断滑动方向 事件
const bindTouchDirection = (
  ref: any,
  callback: (direction: string) => void,
) => {
  let startX: number;
  let startY: number;
  let endX: number;
  let endY: number;

  ref.addEventListener('touchstart', (e: any) => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  ref.addEventListener('touchend', (e: any) => {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;

    callback(getDirection(startX, startY, endX, endY));
  });
};

export { bindTouchDirection };
