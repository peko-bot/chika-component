import React, { Component } from 'react';
import extend from '../../utils/DeepClone';

type CallbackFunc = (dataItem: any, childProps: any, e?: any) => void;
export interface TemplateProps {
  dataSource?: Array<any>;
  template?: any;
  bindKey?: string;
  onDataFormat?: (dataItem: any, childProps: any, bindKey?: string) => void;
  onClick?: CallbackFunc;
  onPress?: CallbackFunc;
  timeForTriggerLongPress?: number;
}

export default class Template extends Component<TemplateProps> {
  handleChildEvent = (childNode: any, dataItem: any) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const {
      onClick: parentOnClick,
      onPress: parentOnPress,
      timeForTriggerLongPress = 700,
    } = this.props;
    const childProps = childNode.props;
    const { onClick, onPress, stopPropagation } = childProps;
    // todo: find a fixed value for key
    childNode.key = `template-child-${Math.random() * 10000}`;

    childProps.onClick = (e: MouseEvent) => {
      // if stop bubble, click event on the parent dom will not be called,
      // but if not, callback in core will be called many times
      // TODO: find a way to avoid this dilemma, but now, stop it
      e.stopPropagation();
      onClick && onClick(dataItem, childProps, e);
      if (!stopPropagation) {
        parentOnClick && parentOnClick(dataItem, childProps, e);
      }
    };

    let timer: any;
    childProps.onTouchStart = (e: TouchEvent) => {
      // if stop bubble, click event on the parent dom will not be called,
      // but if not, callback in core will be called many times
      // TODO: find a way to avoid this dilemma, but now, stop it
      e.stopPropagation();
      timer = setTimeout(() => {
        onPress && onPress(dataItem, childProps, e);
        if (!stopPropagation) {
          parentOnPress && parentOnPress(dataItem, childProps, e);
        }
      }, timeForTriggerLongPress);
    };

    childProps.onTouchMove = () => {
      clearTimeout(timer);
    };

    childProps.onTouchEnd = () => {
      clearTimeout(timer);
    };

    // fix warning: Unknown event handler property
    delete childProps.onPress;
    delete childProps.stopPropagation;

    return childNode;
  };

  handleChildData = (childNode: any, dataItem: any) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const { bindKey = 'data-key', onDataFormat } = this.props;
    const childProps = childNode.props;
    if (childProps[bindKey]) {
      const key = childProps[bindKey];
      const value = dataItem[key];
      childProps.children = onDataFormat
        ? onDataFormat(value, childProps, bindKey)
        : value;
    }
    return childNode;
  };

  travelChildren = (children: any, item: any) => {
    React.Children.map(children, child => {
      let childNode = this.handleChildEvent(child, item);
      childNode = this.handleChildData(childNode, item);
      if (
        child.props &&
        child.props.children &&
        typeof child.props.children !== 'string'
      ) {
        this.travelChildren(child.props.children, item);
      }
    });
  };

  renderTemplate = () => {
    const { dataSource = [], template } = this.props;
    const target = template || this.props.children;
    let children = [];
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      // copy template
      const singleTemplate = extend({}, target);
      // render it
      this.travelChildren(singleTemplate, item);
      children.push(singleTemplate);
    }
    return children;
  };

  renderEmpty = () => {
    return (
      <div className="Template">
        <img src="./assets/nodata.png" style={{ width: '100%' }} />
      </div>
    );
  };

  render = () => {
    const { dataSource = [] } = this.props;

    if (dataSource.length === 0) {
      return this.renderEmpty();
    }
    return <div className="Template">{this.renderTemplate()}</div>;
  };
}
