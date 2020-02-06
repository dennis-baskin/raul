const {exec, exit} = require('shelljs')

const builder = Object.freeze({})

const handler = (args) => {
  const command = `raul gulp lint`
  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['lint', 'l'],
  describe: 'runs all lint tasks',
  builder: builder,
  handler: handler,
}
