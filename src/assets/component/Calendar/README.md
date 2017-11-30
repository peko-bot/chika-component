## 简单日历
- 自定义时段
- 单个日期可控

## API
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start | 开始时间 | string，Date能解析的那种 | 无 |
| end | 结束时间 | string，Date能解析的那种 | 无 |
| 方法 | 说明 | 类型 |
| --- | --- | --- |
| refresh | 时段发生改变时需要调用该方法。direction是方向，select是标识项，比如你想给某个日期的格子表上颜色 | Function(direction, select) |

调用refresh方法一定要在模块页刷新state之后  
调用refresh方法一定要在模块页刷新state之后  
调用refresh方法一定要在模块页刷新state之后  

## 演示效果
![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/Calendar/demo.gif)
