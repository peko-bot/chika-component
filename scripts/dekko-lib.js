const $ = require('dekko');
const chalk = require('chalk');

$('lib')
  .isDirectory()
  .hasFile('index.js')
  .hasDirectory('assets')
  .hasDirectory('component')
  .hasDirectory('util');
$('lib/component')
  .isDirectory()
  .hasDirectory('Calendar')
  .hasDirectory('Container')
  .hasDirectory('Drawer')
  .hasDirectory('EasyLeaflet')
  .hasDirectory('Progress')
  .hasDirectory('Ripple')
  .hasDirectory('Swiper')
  .hasDirectory('Tabs')
  .hasDirectory('Upload');
