# TransformManager

English | [简体中文](./README-zh_CN.md)

Controll the translation of children

## Demo

https://zy410419243.github.io/chika-component/#/transform

## Usage

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

Need to find a way to change `currentOrder`, update to 0, you will get the change of item

Check [there](../../demo/TransformManager/index.tsx) for detail

## API

### TransformManager props

|     name     | description     |  type  | default |
| :----------: | --------------- | :----: | :-----: |
| currentGroup | transform group | string |    -    |
| currentOrder | transform order | number |    -    |
