/**
 * 处理详情页数据排序，用于过渡动画
 * 先找到对应value所在的index，然后根据index加入order属性
 * left: order * -100%
 */
const handleDetailDatas = (datas, value, mainKey) => {
  if (datas.length == 0) {
    return datas;
  }

  let index = -1;

  for (let i = 0; i < datas.length; i++) {
    let item = datas[i];

    if (item[mainKey] == value) {
      index = i;

      break;
    }
  }

  for (let i = 0, order = -index; i < datas.length; i++, order++) {
    let item = datas[i];

    item.detailOrder = order;
  }

  return datas;
};

module.exports = { handleDetailDatas };
