const path = require('path');
const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'lib/Button/index': path.join(cwd + '/src/component/Button'),
    'lib/Calendar/index': path.join(cwd + '/src/component/Calendar'),
    'lib/Container/index': path.join(cwd + '/src/component/Container'),
    'lib/Drawer/index': path.join(cwd + '/src/component/Drawer'),
    'lib/EasyLeaflet/index': path.join(cwd + '/src/component/EasyLeaflet'),
    'lib/Progress/index': path.join(cwd + '/src/component/Progress'),
    'lib/Ripple/index': path.join(cwd + '/src/component/Ripple'),
    'lib/Swiper/index': path.join(cwd + '/src/component/Swiper'),
    'lib/Tabs/index': path.join(cwd + '/src/component/Tabs'),
    'lib/Upload/index': path.join(cwd + '/src/component/Upload'),
  },
  output: {
    path: path.join(cwd + '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
};
