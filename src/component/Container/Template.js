import React, { Component } from 'react';
import PropTypes from 'prop-types';
import extend from '../../util/DeepClone';

function noop() {}
export default class Template extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    template: PropTypes.element,
    bindKey: PropTypes.string,
    onDataFormat: PropTypes.func,
    onClick: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    loading: false,
    template: null,
    bindKey: 'data-key',
    onDataFormat: noop,
    onClick: noop,
    onLongPress: noop,
  };

  handleChildEvent = (childNode, dataItem) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const {
      onClick: parentOnClick,
      onLongPress: parentOnLongPress,
    } = this.props;
    const childProps = childNode.props;
    const { onClick, onLongPress, stopPropagation } = childProps;
    childNode.key = `template-child-${Math.random() * 10000}`;

    if (onClick) {
      childProps.onClick = e => {
        e.stopPropagation();
        onClick(dataItem, childProps, e);
        if (!stopPropagation) {
          parentOnClick(dataItem, childProps, e);
        }
      };
    }

    if (onLongPress) {
      let timer;

      childProps.onTouchStart = e => {
        timer = setTimeout(() => {
          onLongPress(dataItem, childProps, e);
          if (!stopPropagation) {
            parentOnLongPress(dataItem, childProps, e);
          }
        }, 700);
      };

      childProps.onTouchMove = () => {
        clearTimeout(timer);
      };

      childProps.onTouchEnd = () => {
        clearTimeout(timer);
      };
    }
    // fix warning: Unknown event handler property
    delete childProps.onLongPress;
    delete childProps.stopPropagation;

    return childNode;
  };

  handleChildData = (childNode, dataItem) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const { bindKey, onDataFormat } = this.props;
    const childProps = childNode.props;
    if ([bindKey] in childProps) {
      const key = childProps[bindKey];
      const value = dataItem[key];
      childProps.children = onDataFormat(value, childProps);
    }
    return childNode;
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

  renderTemplate = () => {
    const { dataSource, mainKey, template } = this.props;
    let children = [];
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      // copy template
      const singleTemplate = extend({}, template);
      // render it
      this.travelChildren(singleTemplate, item, item[mainKey]);
      children.push(singleTemplate);
    }
    return children;
  };

  renderEmpty = () => {
    return (
      <div className="Template">
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
    return <div className="Template">{this.renderTemplate()}</div>;
  };
}
