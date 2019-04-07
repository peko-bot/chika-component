const path = require('path');
const fs = require('fs-extra');
const cwd = process.cwd();

const fileList = fs.readdirSync(path.join(cwd, 'src/component/'));
const entry = {};
for (let item of fileList) {
  entry['lib/' + item + '/index'] = path.join(cwd, 'src/component/' + item);
}
entry['ninoninoni'] = path.join(cwd, '/src/go');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry,
  output: {
    path: path.join(cwd, '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
};
