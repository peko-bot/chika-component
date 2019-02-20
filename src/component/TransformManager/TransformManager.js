import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './css/TransformManager.css';

let groupTypes = [];
let groups = [];

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
    groupTypes = getGroupTypes(childProps);
    groups = generateGroups(groupTypes, childProps);

    if (nextState.currentGroup === '') {
      nextState.currentGroup = nextProps.currentGroup;
    }
    if (nextProps.currentGroup === nextState.currentGroup) {
      nextState.display = groups[nextProps.currentGroup];
      nextState.currentOrder = nextProps.currentOrder;
      return nextState;
    }
    // when group name is different, animation of next group item
    // will disappear. The effect of the following code is to solve this.
    //
    // 1. find the index in state where order is 0,
    //    and get subarray from state that slice with the index.
    // 2. add target group item from props in the subarray
    // 3. return display
    // 4. update state in componentDidUpdate
    if (nextProps.currentGroup !== nextState.currentGroup) {
      const prevGroupIndex = groups[nextState.currentGroup].findIndex(
        current => current.order === 0,
      );
      const prevGroup = groups[nextState.currentGroup].slice(
        0,
        prevGroupIndex + 1,
      );
      const nextDisplayItem =
        groups[nextProps.currentGroup][nextProps.currentOrder];
      nextDisplayItem.order = prevGroup.length;
      nextState.display = [...prevGroup, nextDisplayItem];
      nextState.currentOrder = 1;
      nextState.currentGroup = nextProps.currentGroup;
      return nextState;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentGroup: '',
      currentOrder: 0,
      display: [],
      history: [],
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.currentGroup !== prevState.currentGroup) {
      this.setState({ display: groups[prevState.currentGroup] });
    }
  };

  renderChildren = () => {
    const { display, currentOrder } = this.state;
    let result = [];
    for (let item of display) {
      const { children, order, style, className, ...rest } = item;
      result.push(
        <div
          style={Object.assign(
            {
              transform: `translate3d(${(order - currentOrder) * 100}%, 0, 0)`,
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
