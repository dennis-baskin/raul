const argv = require('yargs').argv
const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const log = require('captains-log')()

gulp.task('build:styleguide', [
  'js',
  'js:styleguide',
  'css',
  'css:styleguide',
  'css:styleguide:vendor',
  'templates:styleguide',
  'data:mock-api:styleguide',
], () => {
  if (!argv.watch) return

  gulp.watch('scss/**/*.scss', ['css'])
  gulp.watch('styleguide/css/*.scss', ['css:styleguide'])
  gulp.watch('js/**/*.js', ['js'])
  gulp.watch('styleguide/js/*.js', ['js:styleguide'])
  gulp.watch('styleguide/**/*.ejs', ['templates:styleguide'])

  log.info('Watching for file changes')
})

gulp.task('styleguide', gulpSequence('lint', 'build:styleguide'))
