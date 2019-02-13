const path = require('path');
const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'lib/Button/index.js': path.join(cwd + '/src/component/Button'),
    'lib/Calendar/index.js': path.join(cwd + '/src/component/Calendar'),
    'lib/Container/index.js': path.join(cwd + '/src/component/Container'),
    'lib/Drawer/index.js': path.join(cwd + '/src/component/Drawer'),
    'lib/EasyLeaflet/index.js': path.join(cwd + '/src/component/EasyLeaflet'),
    'lib/Progress/index.js': path.join(cwd + '/src/component/Progress'),
    'lib/Ripple/index.js': path.join(cwd + '/src/component/Ripple'),
    'lib/Swiper/index.js': path.join(cwd + '/src/component/Swiper'),
    'lib/Tabs/index.js': path.join(cwd + '/src/component/Tabs'),
    'lib/Upload/index.js': path.join(cwd + '/src/component/Upload'),
  },
  output: {
    path: path.join(cwd + '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
};
