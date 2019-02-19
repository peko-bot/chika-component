import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './css/TransformManager.css';

const getGroupTypes = childProps => {
  let result = [];
  for (let item of childProps) {
    result.push(item.group);
  }
  result = Array.from(new Set(result));
  return result;
};

// generate groups by group names
const generateGroups = (groups, childProps) => {
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

  static getDerivedStateFromProps(nextProps, nextState) {
    let childProps = [];
    React.Children.map(nextProps.children, child => {
      childProps.push(Object.assign({}, child.props, { key: child.key }));
    });
    const groupTypes = getGroupTypes(childProps);
    const groups = generateGroups(groupTypes, childProps);

    if (nextState.currentGroup === '') {
      nextState.currentGroup = nextProps.currentGroup;
    }
    if (nextProps.currentGroup === nextState.currentGroup) {
      nextState.display = groups[nextProps.currentGroup];
      return nextState;
    }
    if (nextProps.currentGroup !== nextState.currentGroup) {
      nextState.display = [
        ...groups[nextProps.currentGroup],
        ...groups[nextState.currentGroup],
      ];
      nextState.currentGroup = nextProps.currentGroup;
      return nextState;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentGroup: '',
      display: [],
    };
  }

  renderChildren = () => {
    if (Object.keys(this.state).length < 2) {
      return null;
    }
    const { props, state } = this;
    let result = [];
    for (let item of state.display) {
      const { children, order, style, className, ...rest } = item;
      result.push(
        <div
          style={Object.assign(
            {
              transform: `translate3d(${(order - props.currentOrder) *
                100}%, 0, 0)`,
            },
            style,
          )}
          className={classNames('Transform-item', className)}
          {...rest}
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
