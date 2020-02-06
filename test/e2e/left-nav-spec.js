const SCREENSHOT_DIRECTORY = setScreenshotDirectory('left-nav')

console.log(SCREENSHOT_DIRECTORY)

const COLLAPSED_WIDTH = 54
const EXPANDED_WIDTH = 300

describe('Left Navigation', () => {
  let page

  before(async () => {
    page = await browser.newPage()
    await page.setViewport({width: 1200, height: 800})
    await page.goto(PRODUCT.url)
    await page.setCookie({name: 'expandedLeftNav', value: 'true'})
    await PRODUCT.login(page)
  })

  after(async () => await page.close())

  it('collapses when toggle is clicked', async () => {
    const menuButton = await page.$('#raul-header-menu-button')
    const leftNav = await page.$('#raul-left-navigation')

    await page.screenshot({path: `${SCREENSHOT_DIRECTORY}01.1-before-collapse.png`, fullPage: true})
    await menuButton.click()
    await page.waitFor(500)
    await page.screenshot({path: `${SCREENSHOT_DIRECTORY}01.2-after-collapse.png`, fullPage: true})

    expect((await leftNav.boundingBox()).width).to.eql(COLLAPSED_WIDTH)
  })

  it('expands when toggle is clicked again', async () => {
    const menuButton = await page.$('#raul-header-menu-button')
    const leftNav = await page.$('#raul-left-navigation')

    await menuButton.click()
    await page.waitFor(500)
    await page.screenshot({path: `${SCREENSHOT_DIRECTORY}01.3-after-expand.png`, fullPage: true})

    expect((await leftNav.boundingBox()).width).to.eql(EXPANDED_WIDTH)
  })
})
