import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './css/TransformManager.css';

const getGroups = childProps => {
  let result = [];
  for (let item of childProps) {
    result.push(item.group);
  }
  result = Array.from(new Set(result));
  return result;
};

// generate state by group names
const generateNewState = (groups, childProps) => {
  let newState = {};

  for (let groupName of groups) {
    newState[groupName] = [];
    for (let childProp of childProps) {
      if (groupName === childProp.group) {
        newState[groupName].push(childProp);
      }
    }
  }
  return newState;
};

export default class TransformManager extends PureComponent {
  static propTypes = {
    currentGroup: PropTypes.string,
    currentOrder: PropTypes.number,
  };

  static defaultProps = {
    currentGroup: '',
    currentOrder: 0,
  };

  static getDerivedStateFromProps(nextProps) {
    let childProps = [];
    React.Children.map(nextProps.children, child => {
      childProps.push(Object.assign({}, child.props, { key: child.key }));
    });
    const groups = getGroups(childProps);
    return generateNewState(groups, childProps);
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderChildren = () => {
    if (Object.keys(this.state).length === 0) {
      return null;
    }
    const { currentGroup, currentOrder } = this.props;
    let result = [];
    const current = this.state[currentGroup];
    const currentLen = current.length;
    for (let i = 0; i < currentLen; i++) {
      const { children, order, style, className, ...props } = current[i];
      result.push(
        <div
          style={Object.assign(
            {
              transform: `translate3d(${(order - currentOrder) * 100}%, 0, 0)`,
            },
            style,
          )}
          className={classNames('Transform-item', className)}
          {...props}
        >
          {children}
        </div>,
      );
    }
    return result;
  };

  render = () => {
    return <div className="TransformManager">{this.renderChildren()}</div>;
  };
}
