import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './css/TransformManager.css';

export interface TransformManagerProps {
  currentGroup: string;
  currentOrder: number | string;
  children?: any;
}
export interface TransformManagerState {
  currentGroup: string;
  currentOrder: number | string;
  display: Array<any>;
  history: Array<any>;
  shouldTransform: boolean;
  shouldRender: boolean;
}

let groupTypes: Array<any> = [];
let groups: any = [];

const getGroupTypes = (childProps: any) => {
  let result = [];
  for (let item of childProps) {
    result.push(item.group);
  }
  result = Array.from(new Set(result));
  return result;
};

// generate groups by group names
const generateGroups = (groups: any, childProps: any) => {
  let newState: any = {};
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

export default class TransformManager extends PureComponent<
  TransformManagerProps,
  TransformManagerState
> {
  state: TransformManagerState = {
    currentGroup: '',
    currentOrder: 0,
    display: [],
    history: [],
    shouldTransform: false,
    shouldRender: false,
  };

  static defaultProps = {
    currentGroup: '',
    currentOrder: 0,
  };

  static getDerivedStateFromProps(
    nextProps: TransformManagerProps,
    nextState: TransformManagerState,
  ) {
    let childProps: Array<any> = [];
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
    //    create a new array, [A, B].
    // 2. render it, but not changing order, for pre-translation.
    // 3. there is only two element, it's safe to translate now.
    //    change display to re-render => transform
    // 4. after translation, render real B.
    if (
      nextState.currentGroup &&
      nextProps.currentGroup &&
      nextProps.currentGroup !== nextState.currentGroup
    ) {
      const prevGroupIndex = groups[nextState.currentGroup].findIndex(
        (current: any) => {
          const compare = current.order - +nextState.currentOrder;
          return compare === 0;
        },
      );
      let prevGroup: any = {};
      if (prevGroupIndex !== -1) {
        prevGroup = groups[nextState.currentGroup][prevGroupIndex];
        prevGroup.order = nextState.currentOrder;
      }
      const nextDisplayItem =
        groups[nextProps.currentGroup][nextProps.currentOrder];
      nextDisplayItem.order = +nextState.currentOrder + 1;

      if (!nextState.shouldTransform && !nextState.shouldRender) {
        nextState.display = [prevGroup, nextDisplayItem];
        return nextState;
      }
      if (!nextState.shouldRender) {
        return { currentOrder: 1 };
      }
      if (nextState.shouldRender) {
        let display: Array<any> = [];
        groups[nextProps.currentGroup].map((item: any, i: number) => {
          display.push({
            ...item,
            order: i + 1,
          });
        });
        return { display, currentGroup: nextProps.currentGroup };
      }
    }
    return null;
  }

  componentDidUpdate = (prevProps: TransformManagerProps) => {
    // 2. render it, but not changing order, for pre-translation
    if (this.props.currentGroup !== prevProps.currentGroup) {
      setTimeout(() => {
        this.setState({ shouldTransform: true });
      }, 0);
    }
    // 4. after translation, render real B
    if (!this.state.shouldRender && this.state.shouldTransform) {
      setTimeout(() => {
        this.setState({ shouldRender: true }, () => {
          this.setState({ shouldRender: false, shouldTransform: false });
        });
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
              transform: `translate3d(${(order - +currentOrder) * 100}%, 0, 0)`,
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
