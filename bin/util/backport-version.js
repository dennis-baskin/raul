const fs = require('fs')

module.exports = (() => {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8')
  const backportVersionRegex = /^(?:.*)\n\n>\sbackports\s(.*)\n/g
  const captureArray = backportVersionRegex.exec(changelog)
  return captureArray && captureArray.length > 1 ? captureArray[1] : null
})()
