import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd-mobile';
const operation = Modal.operation;
import moment from 'moment';
import extend from '../../../util/DeepClone';

export default class Templet extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    templet: PropTypes.element,
    bindKey: PropTypes.string,
  };

  static defaultProps = {
    dataSource: [],
    loading: false,
    templet: null,
    bindKey: 'data-key',
  };

  handleChildEvent = (childNode, dataItem) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const childProps = childNode.props;
    const { onClick, onLongPress } = childProps;
    childNode.key = `templet-child-${Math.random() * 10000}`;

    if (onClick) {
      childProps.onClick = e => {
        e.stopPropagation();
        onClick(dataItem, e);
      };
    }

    if (onLongPress) {
      let timer;

      childProps.onTouchStart = e => {
        timer = setTimeout(() => {
          onLongPress(dataItem, e);
        }, 700);
      };

      childProps.onTouchMove = () => {
        clearTimeout(timer);
      };

      childProps.onTouchEnd = () => {
        clearTimeout(timer);
      };
    }
    return childNode;
  };

  // 递归复制模版，填入数据
  travelChildren = (children, item, mainValue) => {
    const { bindKey } = this.props;

    React.Children.map(children, child => {
      let { format, decimalcount, unit } = child.props;
      let instance, key;

      instance = this.handleChildEvent(child, item);

      /* 绑定点击事件，模版中所谓的head就是每块元素的最顶层标签 */
      let value = item[key];

      /* 列表页预处理 */
      if (instance) {
        if (instance[bindKey] && value !== undefined) {
          /* 处理时间格式 */
          if (format) {
            instance.children = value = moment(value).format(format);
          }

          /* 处理小数保留位数 */
          if (decimalcount) {
            instance.children = value = parseFloat(value).toFixed(decimalcount);
          }

          /* 处理单位 */
          if (unit) {
            instance.children = value = `${value} ${unit}`;
          }

          instance.children = instance.children ? instance.children : value;
        } else if (instance && typeof instance.children === 'object') {
          this.travelChildren(instance.children, item, mainValue);
        }
      }
    });
  };

  renderTemplet = () => {
    const { dataSource, mainKey, templet } = this.props;
    // 重置详情页left顺序，顺带重新渲染模版
    let children = [];
    for (let i = 0; i < dataSource.length; i++) {
      let item = dataSource[i];
      // copy templet
      let singleTemplet = extend({}, templet);
      // render templet
      this.travelChildren(singleTemplet, item, item[mainKey]);
      children.push(singleTemplet);
    }
    return children;
  };

  renderEmpty = () => {
    return (
      <div className="Templet">
        <img
          src="../../assets/List_Container/nodata.png"
          style={{ width: '100%' }}
        />
      </div>
    );
  };

  render = () => {
    const { dataSource, loading } = this.props;

    if (!dataSource.length && !loading) {
      return this.renderEmpty();
    }
    return <div className="Templet">{this.renderTemplet()}</div>;
  };
}
