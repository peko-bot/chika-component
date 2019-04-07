const $ = require('dekko');
const chalk = require('chalk');

try {
  $('lib')
    .isDirectory()
    .hasFile('index.js')
    .hasDirectory('assets')
    .hasDirectory('component')
    .hasDirectory('utils');
  $('lib/component')
    .isDirectory()
    .hasDirectory('Calendar')
    .hasDirectory('Container')
    .hasDirectory('Drawer')
    .hasDirectory('Ripple')
    .hasDirectory('Swiper')
    .hasDirectory('Tabs')
    .hasDirectory('Upload')
    .hasDirectory('Template')
    .hasDirectory('MapBox')
    .hasDirectory('Template');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
