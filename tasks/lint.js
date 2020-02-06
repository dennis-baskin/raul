const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')

require('./eslint')
require('./htmllint')
require('./sass-lint')

gulp.task('lint', gulpSequence('htmllint', 'sass-lint', 'eslint'))
