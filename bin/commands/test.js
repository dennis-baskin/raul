const {exec, exit} = require('shelljs')

const builder = Object.freeze({
  product: {
    alias: 'p',
    default: 'styleguide',
  },

  unit: {
    alias: 'u',
    default: false,
  },

  e2e: {
    alias: 'e',
    default: false,
  },
})

const handler = async (args) => {
  const env = `NODE_ENV=test TEST_PRODUCT=${args.product}`
  const mocha = `${args.root}node_modules/mocha/bin/mocha`
  const e2eBootstrap = `${args.root}test/e2e/e2e-spec-helper.js`
  const unitBootstrap = `${args.root}test/unit/unit-spec-helper.js`
  const opt = '--timeout 30000'
  const e2e = `--recursive ${args.root}test/e2e/**/*-spec.js`
  const unit = `--recursive ${args.root}test/unit/**/*-spec.js`
  const requires = '--require babel-core/register --require babel-polyfill'

  const e2eCommand = `${env} ${mocha} ${e2eBootstrap} ${opt} ${e2e} ${requires} --color always`
  const unitCommand = `${env} ${mocha} ${unitBootstrap} ${unit} ${requires} --color always`

  let command = `${e2eCommand} && ${unitCommand}`

  if (args.e2e === true && args.unit === false) {
    command = e2eCommand
  } else if (args.e2e === false && args.unit === true) {
    command = unitCommand
  }

  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['test', 't'],
  describe: 'runs e2e and unit tests',
  builder: builder,
  handler: handler,
}
