import 'jsdom-global/register'
import chai, {expect} from 'chai'
import chaiDom from 'chai-dom'

chai.use(chaiDom)

const globalVariables = {
  expect: global.expect,
}

before(() => (global.expect = expect))
after(() => (global.expect = globalVariables.expect))
