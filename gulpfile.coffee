gulp = require "gulp"
coffee = require "gulp-coffee"



gulp.task "default", ['coffee', 'exec', 'copy-require', 'sass']

gulp.task 'coffee', ['coffee_app_js', 'coffee_app_js_views', 'coffee_app_js_models', 'coffee_app_js_collections', 'coffee_test']

# 编译 coffeesrc/ 目录下的 *coffee
gulp.task 'coffee_app_js', ->
    gulp
    .src 'coffeesrc/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest "app/js/"


# 编译 coffeesrc/views 目录下的 *coffee
gulp.task 'coffee_app_js_views', ->
    gulp
    .src 'coffeesrc/views/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest "app/js/views/"


# 编译 coffeesrc/models 目录下的 *coffee
gulp.task 'coffee_app_js_models', ->
    gulp
    .src 'coffeesrc/models/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest "app/js/models/"


# 编译 coffeesrc/models 目录下的 *coffee
gulp.task 'coffee_app_js_collections', ->
    gulp
    .src 'coffeesrc/collections/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest "app/js/collections/"


# 编译 build 目录下的 *coffee
gulp.task 'coffee_test', ->
    gulp
    .src 'test/coffee/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest "test/"


# 编译根目录下的 *coffee
gulp.task 'coffeeConfig', ->
    gulp
    .src '*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest ""



gulp.task 'exec', ['coffeeConfig'], (cb)->
    exec = require('child_process').exec
    exec 'node node_modules/requirejs/bin/r.js -o require-config.js', (err, stdout, stderr)->
        console.log stdout
        console.log stderr
        cb err
        return


gulp.task 'copy-require', ->
    gulpCopy = require('gulp-copy')

    gulp
    .src 'node_modules/requirejs/require.js'
    .pipe gulpCopy 'build/js/lib/',
        prefix: 2


# 编译 scss&sass 文件
gulp.task 'sass', ->
    sass = require 'gulp-sass'
    gulp
    .src 'sass/**/*.scss'
    .pipe sass({outputStyle:'expanded'}).on 'error', sass.logError
    .pipe gulp.dest 'app/css/'