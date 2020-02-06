const gulp = require('gulp')
const eslint = require('gulp-eslint')
const log = require('captains-log')()

gulp.task('eslint', (done) => {
  return gulp
    .src([
      'bin/**/*.js',
      'js/**/*.js',
      'styleguide/js/**/*.js',
      'tasks/**/*.js',
      '!styleguide/js/vendor/**/*.js',
    ])
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failAfterError().on('error', (err) => done(err)))
    .pipe(eslint.result((result) => {
      if (result.errorCount === 0 && result.warningCount === 0) log.info(`Finished ${result.filePath}`)
    }))
})
