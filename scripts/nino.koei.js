const path = require('path');
const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'lib/Calendar/index': path.join(cwd + '/src/component/Calendar'),
    'lib/Container/index': path.join(cwd + '/src/component/Container'),
    'lib/Drawer/index': path.join(cwd + '/src/component/Drawer'),
    'lib/Progress/index': path.join(cwd + '/src/component/Progress'),
    'lib/Ripple/index': path.join(cwd + '/src/component/Ripple'),
    'lib/Swiper/index': path.join(cwd + '/src/component/Swiper'),
    'lib/Tabs/index': path.join(cwd + '/src/component/Tabs'),
    'lib/TransformManager/index': path.join(
      cwd + '/src/component/TransformManager',
    ),
    'lib/Upload/index': path.join(cwd + '/src/component/Upload'),
    'lib/MapBox/index': path.join(cwd + '/src/component/MapBox'),
    'lib/Template/index': path.join(cwd + '/src/component/Template'),
  },
  output: {
    path: path.join(cwd + '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
