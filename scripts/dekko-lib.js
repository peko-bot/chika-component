const $ = require('dekko');

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
  .hasDirectory('Progress')
  .hasDirectory('Ripple')
  .hasDirectory('Swiper')
  .hasDirectory('Tabs')
  .hasDirectory('Upload');
