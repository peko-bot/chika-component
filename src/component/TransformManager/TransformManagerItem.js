import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TransformManagerItem extends PureComponent {
  static propTypes = {
    group: PropTypes.string,
    order: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  };

  static defaultProps = {
    group: '',
    order: 0,
    className: '',
    children: null,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    const { className, children, ...rest } = this.props;
    return (
      <div className={classNames('TransformManagerItem', className)} {...rest}>
        {children}
      </div>
    );
  };
}
