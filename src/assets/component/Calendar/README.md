## 简单日历
- 自定义时段
- 单个日期可控
- 左右拖动过渡

## API
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start | 开始时间 | string，Date能解析的那种 | 无 |
| end | 结束时间 | string，Date能解析的那种 | 无 |
| select | 选中项，受控属性，可以通过onChange传出的参数调整单个日期样式 | [] | 无 |
| position | 方向，受控属性，当启用拖动过渡时，根据touch传出的参数控制滑动方向 | string | 无 |
| touch | 需传入一个方法接收传出属性，其实就是滑动方向。传出left和right属性，left指从右往左滑动。不加这个属性就没有拖动过渡 | string => {} | 无 |
| onChange | 点击日期项传出，会传出日期字符串和字体颜色。受控属性，比如增加点击的日期项的颜色，就可以在这里加color属性，具体可以看demo | object => {} | 无 |

## 演示效果
![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/Calendar/demo.gif)
