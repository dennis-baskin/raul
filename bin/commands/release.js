const {exec, exit} = require('shelljs')

const FRAMEWORK_VERSION = require('../util/version')
const FRAMEWORK_VERSION_LABEL = require('../util/version-label')

const builder = Object.freeze({})

const handler = (args) => {
  if (!FRAMEWORK_VERSION || !FRAMEWORK_VERSION_LABEL) exit(1)

  const command = `(cd ${args.root} &&
    npm --no-git-tag-version --allow-same-version version ${FRAMEWORK_VERSION}) &&
    npm install &&
    git add package.json package-lock.json CHANGELOG.md &&
    git commit -m "${FRAMEWORK_VERSION_LABEL}" &&
    git push
  `

  if (exec(command).code !== 0) exit(1)
}

module.exports = {
  command: ['release', 'r'],
  describe: 'Prepares branch for release after changelog is updated',
  builder: builder,
  handler: handler,
}
