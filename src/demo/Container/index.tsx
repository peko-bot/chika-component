import React from 'react';
import { Container } from 'chika-component';
import './css/container-demo.css';

export default () => (
  <div className="container-demo">
    <Container tableId={10874} menuId={1392}>
      <ul>
        <li>
          <div className="left">
            <label>名称：</label>
            <label data-key="pjnm" />
          </div>
          <div className="right">
            <label>坝高：</label>
            <label data-key="dam_width" />
          </div>
        </li>
        <li>
          <div className="left">
            <label>坝长：</label>
            <label data-key="crest_length" />
          </div>
          <div className="right">
            <label>主坝类型：</label>
            <label data-key="retain_dam_type" />
          </div>
        </li>
      </ul>
    </Container>
  </div>
);
