const gulp = require('gulp')

const gzip = require('gulp-gzip')
const insert = require('gulp-insert')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const argv = require('yargs').argv
const log = require('captains-log')()
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')

const FRAMEWORK_VERSION = require('../bin/util/version')

const VERSION_COMMENT = `/*! RAUL ${FRAMEWORK_VERSION} (https://styleguide.realpage.com/) */\n`

const STYLEGUIDE_BUILD_DIR = 'dist/styleguide/'

const VUE_NODE_ENV = process.env.VUE_NODE_ENV || 'development'

const ROLLUP_OPTIONS = {
  external: [
    'jquery',
  ],

  plugins: [
    // The order of the plugins makes a big difference on wether or not commonjs plugin will work.
    // The commonjs plugin needs to run before babel to be able to work.
    // Please see https://github.com/rollup/rollup-plugin-commonjs/issues/239#issuecomment-353764860
    // for more context.
    replace({
      'process.env.NODE_ENV': JSON.stringify(VUE_NODE_ENV),
      'process.env.VUE_ENV': JSON.stringify('browser'),
    }),

    vue({
      compileTemplate: true,
    }),

    resolve({
      only: [
        '@webcomponents/custom-elements',
        'ag-grid',
        'babel-polyfill',
        'bootstrap-datepicker',
        'core-js',
        'dropzone',
        'highcharts',
        'lodash',
        'moment',
        'regenerator-runtime',
        'sortablejs',
        'summernote',
        'tempusdominus-bootstrap-4',
        'jquery-bootstrap-wizard',
        'vue',
        'vue2-collapse',
        'vue-custom-element',
        'whatwg-fetch',
        'vuex',
        'xss',
      ],
    }),

    commonjs({
      // At times we want to use a dependecy's built dist file. And in some cases these files
      // might use do a conditional check to see if require is available and try to use it.
      // In these scenarios, it is trying to check for the method availability according to scope
      // or outer context (in our case 'window'). We do not want to try and parse it when we
      // import the file internally. Hence we need to exclude it from inside commonjs plugin.
      exclude: [
        'node_modules/@webcomponents/custom-elements/**',
        'node_modules/ag-grid/**',
        'node_modules/bootstrap-datepicker/**',
        'node_modules/dropzone/**',
        'node_modules/highcharts/**',
        'node_modules/moment/**',
        'node_modules/sortablejs/**',
        'node_modules/summernote/**',
        'node_modules/tempusdominus-bootstrap-4/**',
        'node_modules/jquery-bootstrap-wizard/**',
        'node_modules/vue/**',
        'node_modules/vue-custom-element/**',
        'node_modules/vuex/**',
        'node_modules/whatwg-fetch/**',
      ],
    }),

    babel({
      compact: true,
    }),
  ],

  // Without setting a context, using the keyword 'this' in the global scope will resolve to
  // undefined, which is undesirable when most of the time a package is just assuming it will
  // be either 'window' or 'global'
  //
  // Please see https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined for
  // more "context" :badjokedog:
  context: 'window',
}

const logError = function(error) {
  log.error(error)
  if (argv.watch) this.emit('end')
  return this
}

module.exports = {
  'js': () => {
    return gulp.src(['js/raul.js', 'js/raul-no-babel-polyfill.js'])
      .pipe(rollup(ROLLUP_OPTIONS, {format: 'iife', name: 'raul'}))
      .pipe(insert.prepend('(function($){\n'))
      .pipe(insert.prepend(VERSION_COMMENT))
      .pipe(insert.append('\n  window.RAUL = RAUL;\n})(jQuery)'))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(insert.prepend(VERSION_COMMENT))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .pipe(gzip({preExtension: 'gz'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .on('error', logError)
  },

  'js:shell': () => {
    return gulp.src(['js/raul-shell.js'])
      .pipe(rollup(ROLLUP_OPTIONS, {format: 'iife', name: 'raul'}))
      .pipe(insert.prepend('(function(){\n'))
      .pipe(insert.prepend(VERSION_COMMENT))
      .pipe(insert.append('\n  window.RAUL = RAUL;\n})()'))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(insert.prepend(VERSION_COMMENT))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .pipe(gzip({preExtension: 'gz'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .on('error', logError)
  },

  'js:plugins': () => {
    return gulp.src('js/plugins/**/*.js')
      .pipe(rollup(ROLLUP_OPTIONS, {format: 'iife', name: 'raul'}))
      .pipe(rename({prefix: 'raul-plugin-'}))
      .pipe(gulp.dest('dist/js/plugins'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/plugins'))
      .on('error', logError)
  },

  'js:styleguide': () => {
    return gulp.src('styleguide/js/**/*')
      .pipe(rollup(ROLLUP_OPTIONS, {format: 'iife', name: 'raul'}))
      .pipe(gulp.dest(`${STYLEGUIDE_BUILD_DIR}js`))
      .on('error', logError)
  },
}
