const inquirer = require('inquirer')
const serve = require('serve')

const DEMO_DIRECTORIES = Object.freeze({
  'DIST FILES': 'dist/',
  'SHELL DEMO': 'dist/demo/',
  'TEST ARTIFACTS': 'test/artifacts/',
})

const message = `What would you like to view?

> "Dist Files"     - starts server in [ROOT]/dist/ directory for browsing
> "Shell Demo"     - starts server with [ROOT]/dist/demo/index.html path
> "Test Artifacts" - starts server in [ROOT]/test/artifacts directory for browsing
----------------------------------------------------------------------------------
`

const questions = [
  {
    type: 'list',
    name: 'directory',
    message: message,
    choices: [
      'Dist Files',
      'Shell Demo',
      'Test Artifacts',
    ],
    filter: val => val.toUpperCase(),
  },
]

const builder = Object.freeze({
  port: {
    alias: 'p',
    default: 1337,
  },
})

const handler = (args) => {
  return inquirer.prompt(questions).then(answers => {
    const directory = DEMO_DIRECTORIES[answers.directory]

    serve(`${args.root}${directory}`, {
      port: 1337,
      ignore: ['node_modules'],
      open: true,
    })
  })
}

module.exports = {
  command: ['server', 'start', 's'],
  describe: 'starts a local RAUL server',
  builder: builder,
  handler: handler,
}
