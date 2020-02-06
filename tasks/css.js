const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const gzip = require('gulp-gzip')
const insert = require('gulp-insert')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const minify = require('gulp-clean-css')
const argv = require('yargs').argv
const log = require('captains-log')()

const FRAMEWORK_VERSION = require('../bin/util/version')

const STYLEGUIDE_CSS_BUILD_DIR = 'dist/styleguide/css/'

const VERSION_COMMENT = `/*! RAUL ${FRAMEWORK_VERSION} (https://styleguide.realpage.com/) */\n`

const AUTOPREFIXER_OPTIONS = {
  grid: true,
  browsers: [
    '> 1%',
    'last 2 versions',
    'ie >= 11',
  ],
}

const sassOutput = (type) => sass({outputStyle: type}).on('error', sass.logError)

const logError = function(error) {
  log.error(error)
  if (argv.watch) this.emit('end')
  return this
}

module.exports = {
  'css': () => {
    return gulp.src(['scss/raul.scss', 'scss/raul-shell.scss'])
      .pipe(sassOutput('compact'))
      .pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
      .pipe(insert.prepend(VERSION_COMMENT))
      .pipe(gulp.dest('dist/css'))
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .pipe(rename({suffix: '.min'}))
      .pipe(minify())
      .pipe(gulp.dest('dist/css'))
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .pipe(gzip({preExtension: 'gz'}))
      .pipe(gulp.dest('dist/css'))
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .on('error', logError)
  },

  'css:plugins': () => {
    return gulp.src(['scss/plugins/*.scss'])
      .pipe(sassOutput('expanded'))
      .pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
      .pipe(rename({prefix: 'raul-plugin-'}))
      .pipe(gulp.dest('dist/css/plugins'))
      .pipe(minify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/plugins'))
      .on('error', logError)
  },

  'css:plugins:extensions': () => {
    return gulp.src(['scss/plugins/**/*.scss', '!scss/plugins/*.scss'])
      .pipe(sassOutput('expanded'))
      .pipe(autoprefixer(AUTOPREFIXER_OPTIONS))
      .pipe(gulp.dest('dist/css/plugins'))
      .pipe(minify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/plugins'))
      .on('error', logError)
  },

  'css:styleguide': () => {
    return gulp.src('styleguide/css/*.scss')
      .pipe(sassOutput('compact'))
      .pipe(autoprefixer())
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .pipe(minify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .on('error', logError)
  },

  'css:styleguide:vendor': () => {
    return gulp.src('styleguide/css/**/*.css')
      .pipe(gulp.dest(STYLEGUIDE_CSS_BUILD_DIR))
      .on('error', logError)
  },
}
