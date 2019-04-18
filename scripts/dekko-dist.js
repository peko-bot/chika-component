const $ = require('dekko');
const chalk = require('chalk');

try {
  $('dist')
    .isDirectory()
    .hasDirectory('assets')
    .hasDirectory('.circleci')
    .hasDirectory('lib')
    .hasDirectory('mock')
    .hasFile('index.html')
    .hasFile('ninoninoni.js');
  $('dist/lib')
    .isDirectory()
    .hasDirectory('Container')
    .hasDirectory('MapBox')
    .hasDirectory('Swiper')
    .hasDirectory('Template')
    .hasDirectory('TransformManager')
    .hasDirectory('Upload');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
