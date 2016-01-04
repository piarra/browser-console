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
    proxy: 'localhost:8980'
  });

  gulp.watch([
    'app/**/*.html',
    'app/**/*.less',
    'app/**/*.js'
  ], browserSync.reload);
});

gulp.task('test', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('clean', function(cb) {
  del(DESTINATION, cb);
});

gulp.task('build', ['test', 'clean'], function() {
  gulp.src('app/index.html')
    .pipe($.processhtml('index.html'))
    .pipe(gulp.dest(DESTINATION));

  gulp.src('app/login.html')
    .pipe($.processhtml('login.html'))
    .pipe(gulp.dest(DESTINATION));

  gulp.src('app/lib/*.js')
    .pipe(gulp.dest(DESTINATION + '/lib'));

  gulp.src('app/views/*.html')
    .pipe(gulp.dest(DESTINATION + '/views'));

  gulp.src('app/views/patients/*.html')
    .pipe(gulp.dest(DESTINATION + '/views/patients'));

  gulp.src('app/views/patients/kartes/*.html')
    .pipe(gulp.dest(DESTINATION + '/views/patients/kartes'));

  gulp.src('app/images/*.png')
    .pipe(gulp.dest(DESTINATION + '/images'));

  gulp.src('app/images/*.jpg')
    .pipe(gulp.dest(DESTINATION + '/images'));

  gulp.src('app/styles/*.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe($.concat('styles.min.css'))
    .pipe(gulp.dest(DESTINATION + '/styles'));

  gulp.src(mainBowerFiles())
    .pipe($.filter('**/*.css'))
    .pipe($.concat('vendor.min.css'))
    .pipe(gulp.dest(DESTINATION + '/styles'));

  gulp.src(mainBowerFiles())
    .pipe($.filter('**/*.js'))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.concat('vendor.min.js'))
    .pipe(gulp.dest(DESTINATION + '/scripts'));

  gulp.src(mainBowerFiles())
    .pipe($.filter('**/glyphicons-*.*'))
    .pipe(gulp.dest(DESTINATION + '/fonts'));

  gulp.src('app/scripts/**/*.js')
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.concat('scripts.min.js'))
    .pipe(gulp.dest(DESTINATION + '/scripts'));
});

gulp.task('default', ['server', 'browser-sync']);
