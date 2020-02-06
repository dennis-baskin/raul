const argv = require('yargs').argv
const gulp = require('gulp')
const log = require('captains-log')()
const zip = require('gulp-zip')

const logError = function(error) {
  log.error(error)
  if (argv.watch) this.emit('end')
  return this
}

module.exports = {
  'angular6': () => {
    return gulp
      .src('angular6/dist/angular6/**/*')
      .pipe(gulp.dest('dist/styleguide/angular6'))
  },

  'fonts': () => gulp.src('fonts/*.zip').pipe(gulp.dest('dist/fonts')),

  'fonts:raul-plugin-summernote': () => {
    return gulp
      .src([
        'node_modules/summernote/dist/font/*',
      ])
      .pipe(gulp.dest('dist/css/plugins/font'))
  },

  'zip': () => {
    return gulp
      .src([
        'dist/**/*',
        '!dist/{demo,demo/**}',
        '!dist/{styleguide,styleguide/**}',
      ])
      .pipe(zip('raul.zip'))
      .pipe(gulp.dest('dist'))
      .on('error', logError)
  },
}
