import React from 'react';

import Container from '../../component/Container';
import './css/List_Container_demo.css';

export default class ContainerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnChange = (item, childProps, e) => {
    // eslint-disable-next-line
    console.log('parent');
  };

  // componentDidMount = () => {
  //     // 模拟搜索
  //     setTimeout(() => {
  //         this.container.get_config();

  //         console.log('update')
  //     }, 3000);
  // }

  config = {
    tcid: 10874,
    menuid: 1392,
  };

  sortBy = [
    {
      key: 'dam_width',
      text: '坝高',
    },
    {
      key: 'crest_length',
      text: '坝长',
    },
  ];

  render = () => {
    return (
      <div className="List_Container_demo">
        <Container tableId={-2} menuId={-2}>
          <ul>
            <li>
              <div className="left">
                <label>名称：</label>
                <label data-key="pjnm" />
              </div>
              <div className="right">
                <label>坝高：</label>
                <label data-key="dam_width" unit="m" decimalcount={2} />
              </div>
            </li>

            <li>
              <div className="left">
                <label>坝长：</label>
                <label data-key="crest_length" unit="m" />
              </div>
              <div className="right">
                <label>主坝类型：</label>
                <label
                  data-key="retain_dam_type"
                  // onClick={this.handleOnChange}
                  // stopPropagation
                />
              </div>
            </li>
          </ul>
        </Container>
      </div>
    );
  };
}
