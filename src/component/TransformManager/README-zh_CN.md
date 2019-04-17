# TransformManager

[English](./README.md) | 简体中文

控制子元素的过渡动画

## 实例

https://zy410419243.github.io/chika-component/#/transform

## 用法

```js
import React from 'react';
import { TransformManager } from 'chika-component';
const Item = TransformManager.TransformManagerItem;

export default () => (
  <TransformManager currentGroup="group1" currentOrder={1}>
    <Item group="group1" order={0} key="group1-0">
      group1-0
    </Item>
    <Item group="group1" order={1} key="group1-1">
      group1-1
    </Item>
    <Item group="group1" order={2} key="group1-2">
      group1-2
    </Item>
    <Item group="group2" order={0} key="group2-0">
      group2-0
    </Item>
    <Item group="group2" order={1} key="group2-1">
      group2-1
    </Item>
    <Item group="group2" order={2} key="group2-2">
      group2-2
    </Item>
  </TransformManager>
);
```

需要更新 `currentOrder`，比如更新成 `0`，然后就能看到过渡效果了

[这里](../../demo/TransformManager/index.tsx)是完整 demo

## API

### TransformManager props

|     参数     | 说明         |  类型  | 默认值 |
| :----------: | ------------ | :----: | :----: |
| currentGroup | 过渡动画分组 | string |   -    |
| currentOrder | 过渡动画顺序 | number |   -    |
