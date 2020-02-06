const {exec, exit} = require('shelljs')

const builder = Object.freeze({})

const handler = (args) => {
  const fix = (args.fix || args.f) ? '--fix' : ''
  const command = `${args.root}node_modules/eslint/bin/eslint.js ./ ${fix} --color always`

  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['eslint', 'e'],
  describe: 'runs eslint using local node modules install',
  builder: builder,
  handler: handler,
}
