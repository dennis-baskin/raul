const {exec, exit} = require('shelljs')

const builder = Object.freeze({
  watch: {
    alias: 'w',
    default: false,
  },
})

const handler = (args) => {
  const watch = (args.watch || args.w) ? '--watch' : ''
  const command = `${args.root}/node_modules/gulp/bin/gulp.js build ${watch} --color always`

  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['build [watch]', 'b'],
  describe: 'runs RAUL build process',
  builder: builder,
  handler: handler,
}
