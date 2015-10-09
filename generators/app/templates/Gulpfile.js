var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var ext_replace = require('gulp-ext-replace');
// Nunjucks template engine (really cool)
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['development/_views/_templates/'], { watch: false });
  return gulp.src(['development/_views/**/*.nunjucks', '!development/_views/**/_*.nunjucks', '!development/_views/_templates/**/*.*'])
  .pipe(data(function() {
    return require('./development/_views/data.json')
  }))
  .pipe(nunjucksRender())
  .pipe(ext_replace('.php'))
  .pipe(gulp.dest('development/'))
});
// Make js ugly
gulp.task('uglifyjs', function () {
  return gulp.src('development/_scripts/*.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('development/assets/scripts/'));
});
// Compiling Sass
gulp.task('sass', function () {
  gulp.src(['development/_styles/**/*.{scss,sass}', '!development/_styles/**/_*.{scss,sass}', '!development/_styles/vendor/**/_*.*'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('development/assets/styles/'));
});
// Default task
gulp.task('default',function () {
  gulp.watch('development/_styles/**/*.{scss,sass}',['sass']);
  gulp.watch('development/_scripts/*.js',['uglifyjs']);
  gulp.watch('development/_views/**/*.nunjucks',['nunjucks']);
});