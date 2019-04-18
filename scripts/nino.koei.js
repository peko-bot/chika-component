const path = require('path');
const fs = require('fs-extra');
const cwd = process.cwd();
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileList = fs.readdirSync(path.join(cwd, 'src/component/'));
const entry = {};
for (let item of fileList) {
  entry['lib/' + item + '/index'] = path.join(cwd, 'src/component/' + item);
}
entry['ninoninoni'] = path.join(cwd, '/src/go');

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(cwd, '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), '.circleci/config.yml'),
        to: path.join(process.cwd(), 'dist/.circleci/config.yml'),
      },
    ]),
  ],
};
