## 简单日历
- 自定义时段
- 单个日期可控
- 左右拖动过渡

## API
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start | 开始时间 | string，new Date()能解析的那种 | 无 |
| end | 结束时间 | string，new Date()能解析的那种 | 无 |
| select | 选中项，受控，可以通过onChange传出的参数调整单个日期样式，详情见下方介绍 | [] | 无 |
| position | 方向，受控，当启用拖动过渡时，根据touch传出的参数控制滑动方向 | string | 无 |
| touch | 需传入一个方法接收传出属性，其实就是滑动方向。传出left和right属性，left指从右往左滑动。不加这个属性就没有拖动过渡 | string => {} | 无 |
| onChange | 点击日期项传出，会传出日期字符串和字体颜色。受控属性，比如增加点击的日期项的颜色，就可以在这里加color属性，具体可以看demo | object => {} | 无 |

# select
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| date | 选中项日期，为了ios能正确处理日期，应当把-换成/，例如2018/02/31 | string，new Date()能解析的那种 | 无 |
| style | 日期项样式，就是每个格子的样式，和css in js一样的格式，比如font-size: 16要写成fontSize: 16 | {} | 无 |
| badge | 右上角标样式，每个格子右上角都会有一块div放样式。详情见下方介绍 | {} | 无 |
| changeable | 当你选中其中一个格子A，然后点下一个格子B的时候，A的样式会消失，然后跑到B去。这个参数是用作这个的，设置为false的对象不可改变，比如A原先有是灰色的，点了以后变成白色的，当点B时A会变回灰色 | Boolean | false |
- 以上为固有属性，有其它需要可以自行添加，尽量不要占用这些属性名

# badge
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 右上角小格子里的文字,比如demo中的“异”字就是这个属性加的 | string | 无 |
| style | 同select中的style | {} | 无 |

## 演示效果
![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/Calendar/demo.gif)
