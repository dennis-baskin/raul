const gulp = require('gulp')
const sassLint = require('gulp-sass-lint')

gulp.task('sass-lint', () => {
  return gulp
    .src([
      'styleguide/**/*.s+(a|c)ss',
      'scss/**/*.s+(a|c)ss',
    ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})
