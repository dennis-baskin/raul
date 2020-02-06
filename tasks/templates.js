const gulp = require('gulp')

const ejs = require('gulp-ejs')
const argv = require('yargs').argv
const log = require('captains-log')()
const stripComments = require('gulp-strip-comments')

const FRAMEWORK_VERSION = require('../bin/util/version')

const STYLEGUIDE_BUILD_DIR = 'dist/styleguide/'

const logError = function(error) {
  log.error(error)
  if (argv.watch) this.emit('end')
  return this
}

module.exports = {
  'templates:styleguide': () => {
    return gulp
      .src([
        'styleguide/**/*.ejs',
        '!styleguide/{partials,partials/**,**/partials,**/partials/**}',
      ])
      .pipe(ejs({FRAMEWORK_VERSION: FRAMEWORK_VERSION}, {root: 'styleguide'}, {ext: '.html'}))
      .pipe(stripComments())
      .pipe(gulp.dest(STYLEGUIDE_BUILD_DIR))
      .on('error', logError)
  },

  'templates:demo': () => {
    return gulp.src(['templates/**/*.ejs'])
      .pipe(ejs({FRAMEWORK_VERSION: FRAMEWORK_VERSION}, {}, {ext: '.html'}))
      .pipe(gulp.dest('dist/demo'))
      .on('error', logError)
  },
}
