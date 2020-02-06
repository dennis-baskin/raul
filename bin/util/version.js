const fs = require('fs')

module.exports = (() => {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8')
  const versionRegex = /#\s(v.*?)\s-.*/mg
  const captureArray = versionRegex.exec(changelog)
  return captureArray.length > 1 ? captureArray[1] : null
})()
