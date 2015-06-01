var coffee, gulp;

gulp = require("gulp");

coffee = require("gulp-coffee");

gulp.task("default", ['coffee', 'exec', 'copy-require', 'sass']);

gulp.task('coffee', ['coffee_app_js', 'coffee_app_js_views', 'coffee_app_js_models', 'coffee_app_js_collections', 'coffee_test']);

gulp.task('coffee_app_js', function() {
  return gulp.src('coffeesrc/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest("app/js/"));
});

gulp.task('coffee_app_js_views', function() {
  return gulp.src('coffeesrc/views/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest("app/js/views/"));
});

gulp.task('coffee_app_js_models', function() {
  return gulp.src('coffeesrc/models/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest("app/js/models/"));
});

gulp.task('coffee_app_js_collections', function() {
  return gulp.src('coffeesrc/collections/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest("app/js/collections/"));
});

gulp.task('coffee_test', function() {
  return gulp.src('test/coffee/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest("test/"));
});

gulp.task('coffeeConfig', function() {
  return gulp.src('*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest(""));
});

gulp.task('exec', ['coffeeConfig'], function(cb) {
  var exec;
  exec = require('child_process').exec;
  return exec('node node_modules/requirejs/bin/r.js -o require-config.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('copy-require', function() {
  var gulpCopy;
  gulpCopy = require('gulp-copy');
  return gulp.src('node_modules/requirejs/require.js').pipe(gulpCopy('build/js/lib/', {
    prefix: 2
  }));
});

gulp.task('sass', function() {
  var sass;
  sass = require('gulp-sass');
  return gulp.src('sass/**/*.scss').pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError)).pipe(gulp.dest('app/css/'));
});
