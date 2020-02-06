import {
  addClass,
  css,
  fadeInAnimation,
  fadeOutAnimation,
  insertAfter,
  isVisible,
  removeClass,
  slideDown,
  slideUp
} from '../../dom-utils'
import {
  CLASS,
  EVENT,
  ELEMENT,
  SELECTOR
} from './header-utils'
const itemsToFade = [
  ELEMENT.leftnavTrigger,
  ELEMENT.logo,
  ELEMENT.title,
  ELEMENT.searchMobileTrigger,
  ELEMENT.switcherTrigger,
  ELEMENT.notificationsTrigger,
  ELEMENT.moreTrigger,
  ELEMENT.userTrigger,
]
const itemsToStopPropagationOnClick = [
  ELEMENT.homeTrigger,
  ELEMENT.helpTrigger,
  ELEMENT.settingsTrigger,
  ELEMENT.moreHomeTrigger,
  ELEMENT.moreShoppingTrigger,
  ELEMENT.moreUserTrigger,
  ELEMENT.moreHelpTrigger,
  ELEMENT.moreSettingsTrigger,
  ELEMENT.moreTrigger,
  ELEMENT.more,
  ELEMENT.leftnavTrigger,
  ELEMENT.user,
  ELEMENT.userTrigger,
  ELEMENT.shopping,
  ELEMENT.notifications,
  ELEMENT.breadcrumbBack,
]

export const addStopPropagationOnHeaderItems = headerInstance => {
  itemsToStopPropagationOnClick.forEach(item => {
    if (headerInstance[item]) headerInstance[item].addEventListener(EVENT.click, e => { e.stopPropagation() })
  })
}

export const addEventListenerToSearchMobileTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.searchMobileTrigger]) return

  headerInstance[ELEMENT.searchMobileTrigger].addEventListener(EVENT.click, () => {
    itemsToFade.forEach(item => {
      if (headerInstance[item]) fadeOutAnimation(headerInstance[item], 300)
    })
    setTimeout(() => {
      removeClass(headerInstance[ELEMENT.userTrigger], CLASS.display.displaySMBlock)
      css(headerInstance[ELEMENT.searchMobile], {
        'width': '100%',
        'padding': '0 10px',
      })
      headerInstance[ELEMENT.searchMobile].focus()
    }, 300)
  })
}

export const addEventListenerToSearchMobile = headerInstance => {
  if (!headerInstance[ELEMENT.searchMobile]) return

  headerInstance[ELEMENT.searchMobile].addEventListener(EVENT.blur, () => {
    css(headerInstance[ELEMENT.searchMobile], {
      'width': '0',
      'padding': '0',
    })
    setTimeout(() => {
      itemsToFade.forEach(item => fadeInAnimation(headerInstance[item], 300))
      addClass(headerInstance[ELEMENT.userTrigger], CLASS.display.displaySMBlock)
    }, 300)
  })
}

export const addEventListenerToUserTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.userTrigger] || !headerInstance[ELEMENT.user]) return

  headerInstance[ELEMENT.userTrigger].addEventListener(EVENT.click, () => {
    headerInstance.closeOtherContexts(ELEMENT.user)
    if (isVisible(headerInstance[ELEMENT.user])) return slideUp(headerInstance[ELEMENT.user])

    css(headerInstance[ELEMENT.user], {
      'position': 'absolute',
      'right': '0',
      'top': `${headerInstance[ELEMENT.header].offsetHeight}px`,
    })
    insertAfter(headerInstance[ELEMENT.userTrigger], headerInstance[ELEMENT.user])
    slideDown(headerInstance[ELEMENT.user])
  })
}

export const addEventListenerToMoreTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.moreTrigger] || !headerInstance[ELEMENT.more]) return

  headerInstance[ELEMENT.moreTrigger].addEventListener(EVENT.click, () => {
    if (parseInt(headerInstance[ELEMENT.more].style.width) > 0) {
      css(headerInstance[ELEMENT.more], {
        'width': '0px',
        'boxShadow': 'none',
      })
    } else {
      css(headerInstance[ELEMENT.more], {
        'width': '300px',
        'boxShadow': 'rgba(0, 0, 0, .2) -4px 0 16px 0',
      })
    }
    headerInstance.closeOtherContexts(ELEMENT.more)
  })
}

export const addEventListenerToMoreShoppingTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.moreShoppingTrigger]) return

  if (!headerInstance[ELEMENT.moreShopping]) {
    headerInstance[ELEMENT.moreShoppingTrigger].addEventListener(EVENT.click, () => {
      window.location = headerInstance[ELEMENT.moreShoppingTrigger].getAttribute(SELECTOR.main.dataUrl)
    })
    return
  }
  headerInstance[ELEMENT.moreShoppingTrigger].addEventListener(EVENT.click, () => {
    isVisible(headerInstance[ELEMENT.moreShopping])
      ? slideUp(headerInstance[ELEMENT.moreShopping])
      : slideDown(headerInstance[ELEMENT.moreShopping])
  })
}

export const addEventListenerToMoreUserTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.moreUserTrigger] || !headerInstance[ELEMENT.moreUser]) return

  headerInstance[ELEMENT.moreUserTrigger].addEventListener(EVENT.click, () => {
    if (isVisible(headerInstance[ELEMENT.moreUser])) return slideUp(headerInstance[ELEMENT.moreUser])
    slideDown(headerInstance[ELEMENT.moreUser])
  })
}

const buttonWithMenuFunctionality = (headerInstance, item) => {
  const itemTrigger = `${item}Trigger`
  if (!headerInstance[item] || !headerInstance[itemTrigger]) return

  headerInstance[itemTrigger].addEventListener(EVENT.click, () => {
    headerInstance.closeOtherContexts(item)
    if (isVisible(headerInstance[item])) return fadeOutAnimation(headerInstance[item])

    css(headerInstance[item], {
      'position': 'absolute',
      'right': '-30px',
      'top': `${headerInstance[ELEMENT.header].offsetHeight}px`,
    })
    headerInstance[itemTrigger].closest(SELECTOR.main.navBarItem).appendChild(headerInstance[item])
    fadeInAnimation(headerInstance[item])
  })
}
const buttonWithMenu = [
  ELEMENT.shopping,
  ELEMENT.notifications,
]
export const activateButtonWithMenuFunctionality = headerInstance => {
  buttonWithMenu.forEach(button => buttonWithMenuFunctionality(headerInstance, button))
}

export const addEventListenerToLeftNavTrigger = headerInstance => {
  if (!headerInstance[ELEMENT.leftnavTrigger]) return

  headerInstance[ELEMENT.leftnavTrigger].addEventListener(EVENT.click, e => {
    headerInstance.changeNavState()
    e.stopPropagation()
  })
}

export const addEventListenerToBreadcrumbs = headerInstance => {
  if (!headerInstance[ELEMENT.breadcrumbBack] || !headerInstance[ELEMENT.breadcrumbsDropdown]) return

  headerInstance[ELEMENT.breadcrumbBack].addEventListener(EVENT.click, () => {
    headerInstance.closeOtherContexts(ELEMENT.breadcrumbs)
    if (!isVisible(headerInstance[ELEMENT.breadcrumbsDropdown])) return slideDown(headerInstance[ELEMENT.breadcrumbsDropdown])
    slideUp(headerInstance[ELEMENT.breadcrumbsDropdown])
  })
}

export const addEventListenerToThemeToggle = headerInstance => {
  if (!headerInstance[ELEMENT.themeToggle]) return

  headerInstance[ELEMENT.themeToggle].addEventListener(EVENT.click, () => {
    const isThemeDark = window.localStorage.getItem(ELEMENT.navTheme) === 'dark'
    window.localStorage.setItem(ELEMENT.navTheme, isThemeDark ? 'light' : 'dark')
    headerInstance.updateThemeToggle()
    if (RAUL.leftNavigation) RAUL.leftNavigation.updateTheme()
  })
}
