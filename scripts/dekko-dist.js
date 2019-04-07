const $ = require('dekko');
const chalk = require('chalk');

try {
  $('dist')
    .isDirectory()
    .hasDirectory('assets')
    .hasDirectory('lib')
    .hasDirectory('mock')
    .hasFile('index.html')
    .hasFile('ninoninoni.js')
    .hasFile('ninoninoni.js.map');
  $('dist/lib')
    .isDirectory()
    .hasDirectory('Calendar')
    .hasDirectory('Container')
    .hasDirectory('Drawer')
    .hasDirectory('MapBox')
    .hasDirectory('Ripple')
    .hasDirectory('Swiper')
    .hasDirectory('Tabs')
    .hasDirectory('Template')
    .hasDirectory('TransformManager')
    .hasDirectory('Upload');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
