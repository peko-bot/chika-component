import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<Router />, MOUNT_NODE);

if (module.hot) {
  module.hot.accept();
}
