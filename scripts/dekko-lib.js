const $ = require('dekko');
const chalk = require('chalk');

try {
  $('lib')
    .isDirectory()
    .hasFile('index.js')
    .hasDirectory('assets')
    .hasDirectory('component')
    .hasDirectory('util');
  $('lib/component')
    .isDirectory()
    .hasDirectory('Button')
    .hasDirectory('Calendar')
    .hasDirectory('Container')
    .hasDirectory('Drawer')
    .hasDirectory('EasyLeaflet')
    .hasDirectory('Progress')
    .hasDirectory('Ripple')
    .hasDirectory('Swiper')
    .hasDirectory('Tabs')
    .hasDirectory('Upload');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
  throw Error(error);
}
