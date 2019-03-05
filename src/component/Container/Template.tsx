import React, { Component } from 'react';
import extend from '../../util/DeepClone';

function noop() {}

export interface TemplateProps {
  dataSource?: Array<any>;
  loading?: boolean;
  template?: any;
  bindKey?: string;
  onDataFormat?: (dataItem: any, childProps: any, e?: any) => void;
  onClick?: (dataItem: any, childProps: any, e?: any) => void;
  onLongPress?: (dataItem: any, childProps: any, e?: any) => void;
  timeForTriggerLongPress?: number;
}
export interface TemplateState {}

export default class Template extends Component<TemplateProps, TemplateState> {
  static defaultProps = {
    dataSource: [],
    loading: false,
    template: null,
    bindKey: 'data-key',
    onDataFormat: (value: string) => value,
    onClick: noop,
    onLongPress: noop,
    timeForTriggerLongPress: 700,
  };

  handleChildEvent = (childNode: any, dataItem: any) => {
    if (!childNode || !childNode.props) {
      return childNode;
    }
    const {
      onClick: parentOnClick,
      onLongPress: parentOnLongPress,
      timeForTriggerLongPress,
    } = this.props;
    const childProps = childNode.props;
    const { onClick, onLongPress, stopPropagation } = childProps;
    childNode.key = `template-child-${Math.random() * 10000}`;

    childProps.onClick = (e: any) => {
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
    childProps.onTouchStart = (e: any) => {
      // if stop bubble, click event on the parent dom will not be called,
      // but if not, callback in core will be called many times
      // TODO: find a way to avoid this dilemma, but now, stop it
      e.stopPropagation();
      timer = setTimeout(() => {
        onLongPress && onLongPress(dataItem, childProps, e);
        if (!stopPropagation) {
          parentOnLongPress && parentOnLongPress(dataItem, childProps, e);
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
    delete childProps.onLongPress;
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
      childProps.children = onDataFormat && onDataFormat(value, childProps);
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
        typeof child.props.children != 'string'
      ) {
        this.travelChildren(child.props.children, item);
      }
    });
  };

  renderTemplate = () => {
    const { dataSource = [], template } = this.props;
    let children = [];
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      // copy template
      const singleTemplate = extend({}, template);
      // render it
      this.travelChildren(singleTemplate, item);
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
    const { dataSource = [], loading } = this.props;

    if (!dataSource.length && !loading) {
      return this.renderEmpty();
    }
    return <div className="Template">{this.renderTemplate()}</div>;
  };
}
