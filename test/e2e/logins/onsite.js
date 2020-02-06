module.exports.url = 'https://on-site.com/?login=true'

module.exports.login = (login = {user: '', pass: ''}) => {
  if (!login.user || !login.pass) throw new Error('Missing login credentials')

  return async (page) => {
    const loginAttempt = async () => {
      await page.click('#user_name')
      await page.type('#user_name', login.user, {delay: 20})
      await page.click('#password')
      await page.type('#password', login.pass, {delay: 20})
      await page.click('#submitLogin')

      await Promise.race([
        page.waitForNavigation({waitUntil: 'domcontentloaded'}),
        page.waitForNavigation({waitUntil: 'networkidle0'})
      ])
    }

    await loginAttempt()

    if (await page.$('#login_error') !== null) {
      console.log("    Support users have to login twice 🤮")
      await loginAttempt()
    }
  }
}
