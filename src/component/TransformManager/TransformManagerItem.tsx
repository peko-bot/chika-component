import React, { PureComponent } from 'react';
import classNames from 'classnames';

export interface TransformManagerItemProps {
  group?: string;
  order?: number;
  className?: string;
  children?: any;
}

export default class TransformManagerItem extends PureComponent<
  TransformManagerItemProps
> {
  static defaultProps = {
    group: '',
    order: 0,
    className: '',
    children: null,
  };

  render = () => {
    const { className, children, ...rest } = this.props;
    return (
      <div className={classNames('TransformManagerItem', className)} {...rest}>
        {children}
      </div>
    );
  };
}
