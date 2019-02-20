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
    // 1. get the last element of previous group called A,
    //    get target element of next group called B,
    //    create a new array, [A, B]
    // 2. render it, but not changing order, for pre-translation
    // 3. there is only two element, it's safe to translate now
    //    change display to re-render => transform
    // 4. after translation, render real B
    if (nextProps.currentGroup !== nextState.currentGroup) {
      const prevGroupIndex = groups[nextState.currentGroup].findIndex(
        current => current.order - nextState.currentOrder === 0,
      );
      let prevGroup = [];
      if (prevGroupIndex !== -1) {
        prevGroup = groups[nextState.currentGroup][prevGroupIndex];
      }
      const nextDisplayItem =
        groups[nextProps.currentGroup][nextProps.currentOrder];
      nextDisplayItem.order = 1;

      if (!nextState.shouldTransform && !nextState.shouldRender) {
        nextState.display = [prevGroup, nextDisplayItem];
        return nextState;
      }
      if (nextState.currentOrder === 0 && !nextState.shouldRender) {
        return { currentOrder: 1 };
      }
      if (nextState.shouldRender) {
        let display = [];
        groups[nextProps.currentGroup].map((item, i) => {
          display.push({
            ...item,
            order: i + 1,
          });
        });
        return { display };
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentGroup: '',
      currentOrder: 0,
      display: [],
      history: [],
      shouldTransform: false,
      shouldRender: false,
    };
  }

  componentDidUpdate = prevProps => {
    // 2. render it, but not changing order, for pre-translation
    if (this.props.currentGroup !== prevProps.currentGroup) {
      setTimeout(() => {
        this.setState({ shouldTransform: true });
      }, 0);
    }
    // 4. after translation, render real B
    if (!this.state.shouldRender) {
      setTimeout(() => {
        this.setState({ shouldRender: true });
      }, 500);
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
