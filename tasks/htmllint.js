const gulp = require('gulp')

const colors = require('ansi-colors')
const htmllint = require('gulp-htmllint')
const cliui = require('cliui')
const htmllintRules = require('../htmllintrc.json')

const htmllintReporter = (filepath, issues) => {
  const ui = cliui({width: 120})

  if (issues.length > 0) {
    const header = colors.bold(colors.underline(colors.white(`${filepath}:`)))
    const footer = colors.red(`💩\t ${issues.length} errors`)

    const errors = issues.map((issue) => {
      const location = colors.dim(`[${issue.line}:${issue.column}]`)
      return `${location}\t  ${issue.msg}\t  ${colors.dim(issue.rule)}`
    }).join('\n')

    ui.div(`${header}\n${errors}\n${footer}\n`)

    console.log(ui.toString())

    process.exitCode = 1
  }
}

gulp.task('htmllint', () => {
  return gulp.src(['styleguide/**/*.ejs'])
    .pipe(htmllint({rules: htmllintRules}, htmllintReporter))
})
