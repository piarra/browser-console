'use strict';

module.exports = {
  port: 8980,
  staticBase: require('path').resolve('app'),
  staticPath: ['/bower_components', '/images', '/lib', '/scripts', '/styles', '/views', '/fonts', '/docs'],
};
