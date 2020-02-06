const {exec, exit} = require('shelljs')

const builder = Object.freeze({})

const handler = (args) => {
  const watch = args.watch ? '--watch' : ''
  const command = `${args.root}/node_modules/gulp/bin/gulp.js ${args.task} ${watch} --color always`

  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['gulp [task]', 'g'],
  describe: 'runs gulp tasks without needing global gulp installed',
  builder: builder,
  handler: handler,
}
