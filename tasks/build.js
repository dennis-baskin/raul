const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const del = require('del')
const argv = require('yargs').argv
const log = require('captains-log')()

gulp.task('clean', () => del(['dist/**']))

gulp.task('build:all', ['assets'], () => {
  if (!argv.watch) return

  gulp.watch(['scss/**/*.scss', '!scss/plugins/*.scss'], ['css'])
  gulp.watch(['js/**/*.{js,vue}', '!js/plugins/*'], ['js'])

  gulp.watch(['js/**/*.{js,vue}', '!js/plugins/*'], ['js:shell'])

  gulp.watch(['scss/plugins/*.scss'], ['css:plugins'])
  gulp.watch(['js/plugins/*.{js,vue}'], ['js:plugins'])

  gulp.watch('styleguide/css/*.scss', ['css:styleguide'])
  gulp.watch('styleguide/js/*.js', ['js:styleguide'])
  gulp.watch('styleguide/js/raul-plugin-icons/*.{js,vue}', ['js:styleguide'])
  gulp.watch('styleguide/**/*.ejs', ['templates:styleguide'])

  gulp.watch('angular6/dist/**/*', ['angular6'])

  log.info('Watching for file changes')
})

gulp.task('build', gulpSequence('lint', 'clean', 'build:all', 'zip'))
