import React, { Component } from 'react';
import TransformManager from '../../component/TransformManager';

export default class TransformManagerDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div className="TransformManagerDemo">
        <TransformManager />
      </div>
    );
  };
}
