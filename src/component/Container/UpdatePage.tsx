import React, { Component } from 'react';
import { List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

export interface UpdatePageProps {
  backToList?: () => void;
  config?: Array<any>;
  dataItem?: any;
  type?: string;
}
export interface UpdatePageState {}

function noop() {}

class UpdatePage extends Component<UpdatePageProps, UpdatePageState> {
  static defaultProps = {
    backToList: noop,
    config: [],
    dataItem: {},
    type: 'add',
  };

  render = () => {
    const { backToList } = this.props;
    return (
      <List>
        <List.Item>
          <Button
            type="primary"
            // onClick={this.save}
            inline
            style={{ marginRight: 4, width: 'calc(50% - 4px)' }}
          >
            保存
          </Button>
          <Button inline onClick={backToList} style={{ width: '50%' }}>
            返回
          </Button>
        </List.Item>
      </List>
    );
  };
}

export default createForm()(UpdatePage);
