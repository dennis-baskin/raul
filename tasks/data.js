const gulp = require('gulp')
const argv = require('yargs').argv
const log = require('captains-log')()

const STYLEGUIDE_BUILD_DIR = 'dist/styleguide/'

const logError = function(error) {
  log.error(error)
  if (argv.watch) this.emit('end')
  return this
}

module.exports = {
  'data:mock-api': () => {
    return gulp.src(['templates/mock-api/*'])
      .pipe(gulp.dest('dist/demo/mock-api'))
      .on('error', logError)
  },

  'data:mock-api:styleguide': () => {
    return gulp.src('styleguide/mock-api/*.json')
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}mock-api`))
      .on('error', logError)
  },
}
