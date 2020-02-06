#!/usr/bin/env node

const {exec} = require('shelljs')
const log = require('captains-log')()
const yargs = require('yargs')
const yargonaut = require('yargonaut')

const ROOT = exec('npm root', {silent: true}).replace('node_modules', '').trim()

const errorHandler = (msg, err, args) => {
  if (msg || err) {
    log.error(msg || err)
    log.error('Please see help docs:', args.help())
  }

  if (args.verbose) log.error(err.stack)
  process.exit(1)
}

const validate = (argv, opts) => {
  if (argv._.length > 0) return true
  throw new Error('Please make sure to specify at least one command')
}

yargonaut.style('blue')
  .style('yellow', 'required')
  .helpStyle('green')
  .errorsStyle('red.bold')

// eslint-disable-next-line no-unused-expressions
yargs
  .check(validate)
  .config({root: ROOT})
  .commandDir(`${ROOT}bin/commands/`)
  .option('verbose', {default: false})
  .help('help')
  .fail(errorHandler)
  .version(require(`${ROOT}package.json`).version)
  .wrap(100)
  .argv
