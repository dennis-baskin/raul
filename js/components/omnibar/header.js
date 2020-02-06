import {
  addClass,
  css,
  fadeOutAnimation,
  findElementWithin,
  hasClass,
  insertAfter,
  isVisible,
  nextSibling,
  Q,
  removeClass,
  slideUp,
  toggleClass
} from '../../dom-utils'

import {
  TABLET_BREAKPOINT,
  CLASS,
  ELEMENT,
  EVENT,
  SELECTOR,
  timeoutTime
} from './header-utils'

import {
  activateButtonWithMenuFunctionality,
  addEventListenerToBreadcrumbs,
  addEventListenerToLeftNavTrigger,
  addEventListenerToMoreShoppingTrigger,
  addEventListenerToMoreTrigger,
  addEventListenerToMoreUserTrigger,
  addEventListenerToSearchMobile,
  addEventListenerToSearchMobileTrigger,
  addEventListenerToThemeToggle,
  addEventListenerToUserTrigger,
  addStopPropagationOnHeaderItems
} from './header-events'

/**
 * RAUL Header
 */
window.RAUL = window.RAUL || {}

const body = Q(SELECTOR.body)[0]

const setAvatarIconInitials = withinElement => {
  const userHeader = findElementWithin(withinElement, SELECTOR.main.handle)
  const userAvatar = findElementWithin(withinElement, SELECTOR.main.avatar)
  if (!userAvatar || !userHeader) return

  const nameBoundaryRegex = /\b\s*/
  const userName = userHeader.innerHTML.trim()
  const userNames = userName.split(nameBoundaryRegex)
  const {0: firstName, length: namesLength, [namesLength - 1]: lastName} = userNames
  const initials = [firstName, lastName].map(name => name.charAt(0).toUpperCase()).join('')

  userAvatar.innerHTML = initials
}

export const addEventListenersToDocument = headerInstance => {
  window.addEventListener(EVENT.resize, () => {
    if (window.innerWidth >= TABLET_BREAKPOINT) removeClass(body, CLASS.raul.leftNavOpenMobile)
  })

  document.addEventListener(EVENT.click, e => {
    const switcherSelectors = [
      SELECTOR.main.appSwitcher,
      SELECTOR.main.switcherContext,
    ]
    if (switcherSelectors.some(selector => !!e.target.closest(selector))) return headerInstance.closeOtherContexts(ELEMENT.switcher)

    const navigationSelectors = [
      SELECTOR.main.menu,
      SELECTOR.main.leftNav,
    ]
    if (navigationSelectors.some(selector => !!e.target.closest(selector))) return headerInstance.closeOtherContexts(ELEMENT.navigation)

    headerInstance.closeOtherContexts()
  })
}

const duplicateShoppingToMoreContext = headerInstance => {
  if (headerInstance.moreShoppingTrigger && headerInstance.moreShopping) {
    addClass(headerInstance.moreShopping, CLASS.displayXLNone)
    css(headerInstance.moreShopping, {
      'background': '#E4E6E7',
      'border': 'none',
      'margin': '0',
      'width': '100%',
      'height': 'auto',
      'maxHeight': '200px',
      'overflowY': 'auto',
    })
    insertAfter(headerInstance.moreShoppingTrigger, headerInstance.moreShopping)
  }
}
const duplicateUserToMoreContext = headerInstance => {
  if (headerInstance.moreUserTrigger && headerInstance.moreUser) {
    addClass(headerInstance.moreUser, CLASS.display.displaySMNone)
    css(headerInstance.moreUser, {
      'background': '#fff',
      'border': 'none',
      'margin': '0',
      'width': '100%',
      'height': 'auto',
      'maxHeight': '200px',
      'overflowY': 'auto',
      'boxShadow': 'none',
    })
    insertAfter(headerInstance.moreUserTrigger, headerInstance.moreUser)
  }
}

class Header {
  constructor(header) {
    addEventListenersToDocument(this)

    this[ELEMENT.header] = header
    this[ELEMENT.leftnavItems] = Q(SELECTOR.main.leftNavItem)
    this[ELEMENT.subItems] = Q(SELECTOR.main.leftNavSubItems)
    this[ELEMENT.logo] = findElementWithin(this[ELEMENT.header], SELECTOR.main.logo)
    this[ELEMENT.company] = findElementWithin(this[ELEMENT.header], SELECTOR.main.company)

    this[ELEMENT.search] = findElementWithin(this[ELEMENT.header], SELECTOR.main.searchInput)
    this[ELEMENT.switcherTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.appSwitcher)
    this[ELEMENT.homeTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.home)
    this[ELEMENT.helpTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.help)
    this[ELEMENT.settingsTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.settings)

    this[ELEMENT.themeToggle] = Q(SELECTOR.main.themeToggle)[0]
    this.updateThemeToggle()
    addEventListenerToThemeToggle(this)

    this[ELEMENT.pageHeader] = Q(SELECTOR.main.pageHeader)[0]
    this[ELEMENT.breadcrumbsDropdown] = findElementWithin(this[ELEMENT.pageHeader], SELECTOR.main.breadcrumbsDropdown)
    this[ELEMENT.breadcrumbBack] = findElementWithin(this[ELEMENT.pageHeader], SELECTOR.main.breadcrumbBack)
    addEventListenerToBreadcrumbs(this)

    this[ELEMENT.leftnav] = Q(SELECTOR.main.leftNav)[0]
    setTimeout(() => { if (this[ELEMENT.leftnav]) css(this[ELEMENT.leftnav], {'display': 'block'}) })

    this[ELEMENT.leftnavTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.menuButton)
    addEventListenerToLeftNavTrigger(this)

    this[ELEMENT.notifications] = Q(SELECTOR.main.notificationContext)[0]
    this[ELEMENT.notificationsTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.notifications)
    this[ELEMENT.shopping] = Q(SELECTOR.main.shoppingContext)[0]
    this[ELEMENT.shoppingTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.more.shopping)
    activateButtonWithMenuFunctionality(this)

    this[ELEMENT.title] = findElementWithin(this[ELEMENT.header], SELECTOR.main.title)
    this[ELEMENT.secondaryTitleElements] = findElementWithin(this[ELEMENT.header], SELECTOR.main.secondaryTitleElements)
    if (this[ELEMENT.title]) toggleClass(this[ELEMENT.title], CLASS.raul.hasSubInfo, this[ELEMENT.secondaryTitleElements])

    this[ELEMENT.more] = Q(SELECTOR.more.moreContext)[0]
    this[ELEMENT.moreTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.more.more)
    addEventListenerToMoreTrigger(this)

    this[ELEMENT.moreHomeTrigger] = findElementWithin(this[ELEMENT.more], SELECTOR.more.homeContext)
    this[ELEMENT.moreHelpTrigger] = findElementWithin(this[ELEMENT.more], SELECTOR.more.helpContext)
    this[ELEMENT.moreSettingsTrigger] = findElementWithin(this[ELEMENT.more], SELECTOR.more.helpContext)

    this[ELEMENT.user] = Q(SELECTOR.main.userContext)[0]
    this[ELEMENT.userTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.user)
    this[ELEMENT.moreUserTrigger] = findElementWithin(this[ELEMENT.more], SELECTOR.more.user)
    this[ELEMENT.moreUser] = this[ELEMENT.user] ? this[ELEMENT.user].cloneNode(true) : undefined
    addEventListenerToUserTrigger(this)
    duplicateUserToMoreContext(this)
    addEventListenerToMoreUserTrigger(this)
    setAvatarIconInitials(this[ELEMENT.userTrigger])
    setAvatarIconInitials(this[ELEMENT.moreUserTrigger])

    this[ELEMENT.searchMobile] = findElementWithin(this[ELEMENT.header], SELECTOR.main.searchInputMobile)
    this[ELEMENT.searchMobileTrigger] = findElementWithin(this[ELEMENT.header], SELECTOR.main.searchIconMobile)
    addEventListenerToSearchMobile(this)
    addEventListenerToSearchMobileTrigger(this)

    this[ELEMENT.moreShoppingTrigger] = findElementWithin(this[ELEMENT.more], SELECTOR.more.shoppingContext)
    this[ELEMENT.moreShopping] = this[ELEMENT.shopping] ? this[ELEMENT.shopping].cloneNode(true) : undefined
    duplicateShoppingToMoreContext(this)
    addEventListenerToMoreShoppingTrigger(this)

    addStopPropagationOnHeaderItems(this)
  }

  closeOtherContexts(target) {
    if (target !== ELEMENT.navigation && this[ELEMENT.leftnav] && window.innerWidth < TABLET_BREAKPOINT) {
      removeClass(body, CLASS.raul.leftNavOpenMobile)
    }

    if (target !== ELEMENT.more && this[ELEMENT.more] && !['0px', ''].includes(this[ELEMENT.more].style.width)) {
      css(this[ELEMENT.more], {
        'width': '0',
        'boxShadow': 'none',
      })
    }

    if (target !== ELEMENT.switcher && RAUL.AppSwitcher) RAUL.AppSwitcher.remove()

    if (target !== ELEMENT.notifications && this[ELEMENT.notifications] && isVisible(this[ELEMENT.notifications])) {
      fadeOutAnimation(this[ELEMENT.notifications])
    }
    if (target !== ELEMENT.user && this[ELEMENT.user] && isVisible(this[ELEMENT.user])) {
      slideUp(this[ELEMENT.user])
    }
    if (target !== ELEMENT.shopping && this[ELEMENT.shopping] && isVisible(this[ELEMENT.shopping])) {
      fadeOutAnimation(this[ELEMENT.shopping])
    }
    if (target !== ELEMENT.breadcrumbs &&
      this[ELEMENT.breadcrumbsDropdown] &&
      this[ELEMENT.breadcrumbsDropdown] &&
      isVisible(this[ELEMENT.breadcrumbsDropdown])) {
      slideUp(this[ELEMENT.breadcrumbsDropdown])
    }
  }

  changeNavState() {
    if (!(window.innerWidth >= TABLET_BREAKPOINT)) return toggleClass(body, CLASS.raul.leftNavOpenMobile)

    if (hasClass(body, CLASS.raul.leftNavExpanded)) {
      removeClass(body, CLASS.raul.leftNavExpanded)
      window.localStorage.setItem(ELEMENT.navState, 'minimized')
      if (this[ELEMENT.leftnavItems]) this[ELEMENT.leftnavItems].forEach(leftnavItem => { this.setHeightOfSubmenu(leftnavItem) })

      const subItems = this[ELEMENT.subItems]
      if (!subItems) return
      subItems.forEach(subItem => { css(subItem, {'display': 'none'}) })
      setTimeout(() => {
        subItems.forEach(subItem => { css(subItem, {'display': ''}) })
      }, timeoutTime)

      RAUL.leftNavigation.setMenuHeight()
      RAUL.leftNavigation.setSubMenuMaxHeight()
    } else {
      addClass(body, CLASS.raul.leftNavExpanded)
      window.localStorage.setItem(ELEMENT.navState, 'expanded')
      if (!this[ELEMENT.subItems]) return

      this[ELEMENT.subItems].forEach(subItem => { subItem.removeAttribute('style') })
    }
  }

  updateThemeToggle() {
    const isThemeDark = window.localStorage.getItem(ELEMENT.navTheme) === 'dark'
    const icon = findElementWithin(this[ELEMENT.themeToggle], SELECTOR.icon)
    if (!icon) return
    toggleClass(icon, CLASS.fontAwesome.toggleOff, !isThemeDark)
    toggleClass(icon, CLASS.fontAwesome.toggleOn, isThemeDark)
  }

  setHeightOfSubmenu(element) {
    const leftnavSubmenu = nextSibling(element, SELECTOR.main.leftNavSubItems)
    if (!leftnavSubmenu) return

    const offsetTop = element.offsetTop - window.scrollY
    const height = element.offsetHeight
    css(leftnavSubmenu, {
      'maxHeight': window.innerHeight - (offsetTop + height),
    })
  }
}

let initialized = false

export default () => {
  if (initialized === true) return

  const header = Q(SELECTOR.main.header)[0]

  RAUL.header = new Header(header)

  initialized = true
}

export { Header }
