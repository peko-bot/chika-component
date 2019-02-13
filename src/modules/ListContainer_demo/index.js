import React from 'react';

import Container from '../../component/ListContainer';
// import Container from '../../../dist/ListContainer'
import './css/List_Container_demo.css';

export default class ListContainerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnChange = item => {
    // eslint-disable-next-line
    console.log(item);
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
    // pageSize: 5,
    // showSearch: false, // 是否显示搜索面板
    // showButton: false, // 是否显示右下功能按钮
    // UserId: 1,
    // CellPhone: 13900000000,
    // RequestUrl: '../../webapi/api/v2/generalbackstage/getdata',
    RequestParams: {
      // TCID: 1620,
      // PageSize: 10,
      // PageIndex: 1,
      // CellPhone: 13900000000,
      // sectionid: 4,
      // AddSearchField: 1,
    },
    // RequestMethod: 'POST',
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
    const params = {
      config: this.config,
      sortBy: this.sortBy,
      // domain: 'http://61.175.121.68:9001/webapi/api/v2/generalbackstage/',
      wrappedComponentRef: ref => (this.container = ref),
      style: {
        height:
          (document.documentElement.clientHeight ||
            document.body.clientHeight) - 10,
      },
      // mapPath: '#/easyLeaflet'
    };

    return (
      <div className="List_Container_demo">
        <Container {...params}>
          <div className="container" bind="true">
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
                    onChange={this.handleOnChange}
                  />
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    );
  };
}
