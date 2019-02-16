import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd-mobile';
const operation = Modal.operation;
import moment from 'moment';
import extend from '../../util/DeepClone';

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

  handleChildData = (childNode, dataItem) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const { bindKey } = this.props;
    const childProps = childNode.props;
    if ([bindKey] in childProps) {
      const key = childProps[bindKey];
      const value = dataItem[key];
      childProps.children = this.handleChildDataFormat(value, childProps);
    }
    return childNode;
  };

  handleChildDataFormat = (value, childProps) => {
    const { format, decimalcount, unit } = childProps;

    // handle with date
    if (format) {
      value = moment(value).format(format);
    }

    // handle with decimal number
    if (decimalcount) {
      value = +parseFloat(value.toPrecision(12));
    }

    // handle with unit
    if (unit) {
      value = `${value} ${unit}`;
    }

    return value;
  };

  travelChildren = (children, item) => {
    React.Children.map(children, child => {
      let childNode = this.handleChildEvent(child, item);
      childNode = this.handleChildData(childNode, item);
      if (
        child.props &&
        child.props.children &&
        typeof child.props.children != 'string'
      ) {
        this.travelChildren(child.props.children, item);
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
