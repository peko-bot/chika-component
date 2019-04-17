# Template

English | [简体中文](./README-zh_CN.md)

Just as name, input one template and ten data, output ten template with data

## Demo

https://zy410419243.github.io/chika-component/#/template

## Usage

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

|          name           | description                                                                  |                            type                            |    default     |
| :---------------------: | ---------------------------------------------------------------------------- | :--------------------------------------------------------: | :------------: |
|       dataSource        | as name, dataSource                                                          |                         Array<any>                         |       []       |
|        template         | as name, template, most like some html                                       |                     React.ReactChilren                     | props.children |
|         bindKey         | change bind key of data item                                                 |                           string                           |   'data-key'   |
|      onDataFormat       | called with data item before render real data to DOM, require a return value | (dataItem: any, childProps: any, bindKey?: string) => void |      noop      |
|         onClick         | called with data item when clicking template                                 |     (dataItem: any, childProps: any, e?: any) => void      |      noop      |
|         onPress         | called with data item when on long press                                     |     (dataItem: any, childProps: any, e?: any) => void      |      noop      |
| timeForTriggerLongPress | interval of long press                                                       |                           number                           |     700 ms     |
