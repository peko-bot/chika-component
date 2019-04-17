# Template

[English](./README.md) | 简体中文

输入一个模版跟十条数据，渲染十个带数据的模版

## 示例

https://zy410419243.github.io/chika-component/#/template

## 用法

```js
import React from 'react';
import { Template } from 'chika-component';

const dataSource = [
  { test1: 'test1', test2: 'test2', id: 'template-1' },
  { test1: 'test11', test2: 'test22', id: 'template-2' },
];

export default () => (
  <Template dataSource={dataSource}>
    <>
      <div data-key="test1" />
      <div data-key="test2" />
    </>
  </Template>
);
```

## API

### Template props

|          参数           | 说明                                                 |                            类型                            |     默认值     |
| :---------------------: | ---------------------------------------------------- | :--------------------------------------------------------: | :------------: |
|       dataSource        | 数据源                                               |                         Array<any>                         |       []       |
|        template         | 模版，一般是 html                                    |                     React.ReactChilren                     | props.children |
|         bindKey         | 绑定数据的 key                                       |                           string                           |   'data-key'   |
|      onDataFormat       | 在数据渲染到模版前调用，需要 return 一个用于显示的值 | (dataItem: any, childProps: any, bindKey?: string) => void |      noop      |
|         onClick         | 点击模版时触发                                       |     (dataItem: any, childProps: any, e?: any) => void      |      noop      |
|         onPress         | 长按模版时触发                                       |     (dataItem: any, childProps: any, e?: any) => void      |      noop      |
| timeForTriggerLongPress | 长按时长                                             |                           number                           |     700 ms     |
