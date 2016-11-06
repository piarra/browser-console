var env = process.env.NODE_ENV || 'development';
var gulp = require('gulp');
var del = require('del');
var open = require('open');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();
var url = require('url');
var browserSync = require('browser-sync');

var DESTINATION = 'www/public';

gulp.task('server', function () {
  $.nodemon({
    script: 'www/server.js',
    ext: 'js',
    ignore: ['node_modules', 'app', 'www/public', '.git']
  });
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:8765'
  });

  gulp.watch([
    'app/**/*.html',
    'app/**/*.less',
    'app/**/*.js'
  ], browserSync.reload);
});

gulp.task('default', ['server', 'browser-sync']);
