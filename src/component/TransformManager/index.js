import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/TransformManager.css';

export default class TransformManager extends Component {
  static propTypes = {
    current: PropTypes.number,
  };

  static defaultProps = {
    current: 0,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return <div className="TransformManager">TransformManager</div>;
  };
}
