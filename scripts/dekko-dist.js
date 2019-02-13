const $ = require('dekko');
const chalk = require('chalk');

try {
  $('dist/lib')
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
}
