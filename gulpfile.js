const gulp = require('gulp')

const artifactsTasks = require('./tasks/artifacts')
const cssTasks = require('./tasks/css')
const dataTasks = require('./tasks/data')
const jsTasks = require('./tasks/js')
const templateTasks = require('./tasks/templates')

const artifactsTaskKeys = Object.keys(artifactsTasks)
const cssTaskKeys = Object.keys(cssTasks)
const dataTaskKeys = Object.keys(dataTasks)
const jsTaskKeys = Object.keys(jsTasks)
const templateTaskKeys = Object.keys(templateTasks)

artifactsTaskKeys.forEach(key => gulp.task(key, artifactsTasks[key]))
cssTaskKeys.forEach(key => gulp.task(key, cssTasks[key]))
dataTaskKeys.forEach(key => gulp.task(key, dataTasks[key]))
jsTaskKeys.forEach(key => gulp.task(key, jsTasks[key]))
templateTaskKeys.forEach(key => gulp.task(key, templateTasks[key]))

gulp.task('assets', [
  ...cssTaskKeys,
  ...dataTaskKeys,
  ...jsTaskKeys,
  ...templateTaskKeys,
  ...artifactsTaskKeys,
])

// Includes added in order as dependencies for other tasks.
// This is not ideal at all, but functional for this iteration
require('./tasks/lint')
require('./tasks/styleguide')
require('./tasks/build')
