import React from 'react';
import Template from '../../component/Template';

const dataSource = [
  { test1: 'test1', test2: 'test2', id: 'template-1' },
  { test1: 'test11', test2: 'test22', id: 'template-2' },
];

const TempLateDemo = () => (
  <Template dataSource={dataSource}>
    <>
      <div data-key="test1" />
      <div data-key="test2" />
    </>
  </Template>
);

export default TempLateDemo;
