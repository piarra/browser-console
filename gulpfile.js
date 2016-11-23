var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var DESTINATION = 'www/public';

gulp.task('server', function () {
  var stream = $.nodemon({
    script: 'www/server.js',
    ext: 'js',
    ignore: ['node_modules', 'app', 'www/public', '.git']
  });
  stream.on('start', function() {
    var options = {
      uri: 'http://localhost:8765/'
    };
    gulp.src(__filename)
      .pipe($.open(options));
  });
});

gulp.task('default', ['server']);
