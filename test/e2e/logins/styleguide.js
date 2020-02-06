const FRAMEWORK_VERSION = require('../../../bin/util/version')

module.exports.url = `https://cdn.realpage.com/raul/${FRAMEWORK_VERSION}/styleguide/index.html`

module.exports.login = (_) => async (_) => console.log('No login necessary for styleguide')
