import puppeteer from 'puppeteer'
import {mkdir} from 'shelljs'
import {expect} from 'chai'

// import syntax does not allow dynamic paths, so we have to use require instead
const PRODUCT_NAME = process.env.TEST_PRODUCT.toLowerCase()
const {url, login} = require(`./logins/${PRODUCT_NAME || 'styleguide'}`)

const PRODUCT = {
  url: url,
  login: login({
    user: process.env.TEST_LOGIN_USER,
    pass: process.env.TEST_LOGIN_PASS,
  }),
}

const globalVariables = {
  browser: global.browser,
  expect: global.expect,
}

global.setScreenshotDirectory = (dir) => {
  const directory = `./test/artifacts/${PRODUCT_NAME}/${dir}/`

  mkdir('-p', directory)

  return directory
}

const PUPPETEER_OPTIONS = {
  headless: false,
  timeout: 30000,
}

before(async () => {
  global.expect = expect
  global.browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  global.PRODUCT = PRODUCT
})

after(async () => {
  await browser.close()

  global.browser = globalVariables.browser
  global.expect = globalVariables.expect
})
