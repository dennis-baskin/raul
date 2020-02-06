const fs = require('fs')

module.exports = (() => {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8')
  const versionLabel = /#\s(v.*?)$/mg
  const captureArray = versionLabel.exec(changelog)
  return captureArray.length > 1 ? captureArray[1] : null
})()
