/**
 * RAUL Left Navigation
 */

import {
  addClass,
  removeClass,
  hasClass,
  toggleClass,
  Q,
  find,
  findOne,
  slideToggle
} from '../../dom-utils'

/**
 * Constants
 */

const TABLET_BREAKPOINT = 992

const CLASS_NAME = {
  leftNavigationExpanded: 'raul-left-navigation-expanded',
  leftNavigationItemIcon: 'raul-left-navigation-item-icon',
  leftNavigationMobileOpen: 'raul-left-navigation-mobile-open',
  leftNavigationSubItem: 'raul-left-navigation-subitem',

  active: 'active',
  arrowUp: 'arrow-up',
  darkTheme: 'raul-left-navigation-dark',
  exceedHeight: 'raul-left-navigation-exceed-height',
  hasSubItems: 'has-subitems',
  lightTheme: 'raul-left-navigation-light',
  selected: 'selected',
  subItemsOpen: 'subitems-open',
  noTransition: 'no-transition',
}

const SELECTOR = {
  leftNavigation: '.raul-left-navigation',
  leftNavigationItems: '.raul-left-navigation-items',
  leftNavigationItem: '.raul-left-navigation-item',
  leftNavigationSubItems: '.raul-left-navigation-subitems',
  leftNavigationSubItem: '.raul-left-navigation-subitem',
  leftNavigationItemArrow: '.raul-left-navigation-item-arrow',
  leftNavigationItemIcon: '.raul-left-navigation-item-icon',
  header: '.raul-header',
}

/**
 * Class Definition
 */

class LeftNavigation {
  constructor(leftNavigation) {
    this.leftNavigation = leftNavigation
    this.leftNavigationItems = findOne(this.leftNavigation, SELECTOR.leftNavigationItems)
    if (!this.leftNavigationItems) return {}
    this.leftNavigationItem = find(this.leftNavigationItems, SELECTOR.leftNavigationItem)
    this.leftNavigationSubItems = find(this.leftNavigationItems, SELECTOR.leftNavigationSubItems)
    this.leftNavigationSubItem = find(this.leftNavigationItems, SELECTOR.leftNavigationSubItem)

    this._initialize()
  }

  /**
   * Public
   */

  setState() {
    const leftNavigationState = window.localStorage.getItem('nav-state') || 'expanded'

    toggleClass(document.body, CLASS_NAME.leftNavigationExpanded, (leftNavigationState === 'expanded'))
  }

  updateTheme() {
    const leftNavigationTheme = window.localStorage.getItem('nav-theme') || 'light'
    const isTheme = theme => (leftNavigationTheme === theme)

    toggleClass(this.leftNavigation, CLASS_NAME.darkTheme, isTheme('dark'))
    toggleClass(this.leftNavigation, CLASS_NAME.lightTheme, isTheme('light'))
  }

  setMenuHeight() {
    const documentHeight = () => {
      return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      )
    }
    const viewportHeight = window.innerHeight
    const headerHeight = Q(SELECTOR.header)[0].offsetHeight

    const leftNavigationVisibleHeight = viewportHeight - headerHeight
    const leftNavigationHeight = [...this.leftNavigationItem].reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight - 1
    }, 0)

    if (leftNavigationHeight > leftNavigationVisibleHeight) {
      this._exceedViewportHeight(leftNavigationHeight, documentHeight())
      return
    }

    this._fitViewportHeight()
  }

  setSubMenuMaxHeight() {
    const viewportHeight = window.innerHeight

    ;[...this.leftNavigationItem].forEach(leftNavigationItem => {
      const leftNavigationSubMenu = leftNavigationItem.nextElementSibling

      if (!leftNavigationSubMenu) return

      const leftNavigationItemHeight = leftNavigationItem.offsetHeight
      const leftNavigationOffsetTop = leftNavigationItem.getBoundingClientRect().top - window.scrollY

      leftNavigationSubMenu.style.maxHeight = `${viewportHeight - (leftNavigationOffsetTop + leftNavigationItemHeight)}px`
    })
  }

  toggleSubItems(leftNavigationItem) {
    const subItems = leftNavigationItem.nextElementSibling
    const arrow = findOne(leftNavigationItem, SELECTOR.leftNavigationItemArrow)
    const isLeftNavItem = hasClass(leftNavigationItem, CLASS_NAME.leftNavigationItem)
    const isExpanded = hasClass(document.body, CLASS_NAME.leftNavigationExpanded)
    const isMobileOpen = hasClass(document.body, CLASS_NAME.leftNavigationMobileOpen)

    if (isLeftNavItem && (!isExpanded && !isMobileOpen)) return

    const toggleClasses = () => {
      toggleClass(leftNavigationItem, CLASS_NAME.active)
      toggleClass(arrow, CLASS_NAME.arrowUp)
      toggleClass(subItems, CLASS_NAME.subItemsOpen)
    }

    slideToggle(subItems, {
      transitionTime: 500,
      onSlideStart: toggleClasses,
    })
  }

  changeActiveState(clickedSubItem) {
    [...this.leftNavigationSubItem].forEach(leftNavigationSubItem => {
      removeClass(leftNavigationSubItem, CLASS_NAME.active)
    })
    ;[...this.leftNavigationItem].forEach(leftNavigationItem => {
      removeClass(leftNavigationItem, CLASS_NAME.selected)
    })

    const clickedSubItemClosestMenu = clickedSubItem.closest(`${SELECTOR.leftNavigationItems} > li > ${SELECTOR.leftNavigationSubItems}`)

    addClass(clickedSubItem, CLASS_NAME.active)
    addClass(clickedSubItemClosestMenu.previousElementSibling, CLASS_NAME.selected)
  }

  /**
   * Private
   */

  _temporaryDisableAnimations() {
    [
      this.leftNavigation,
      ...this.leftNavigationItem,
      ...this.leftNavigationSubItems,
    ].forEach((item) => {
      addClass(item, CLASS_NAME.noTransition)

      setTimeout(() => {
        removeClass(item, CLASS_NAME.noTransition)
      }, 300)
    })
  }

  _fitViewportHeight() {
    removeClass(document.body, CLASS_NAME.exceedHeight)
    this.leftNavigation.removeAttribute('style')
  }

  _exceedViewportHeight(leftNavigationHeight, documentHeight) {
    addClass(document.body, CLASS_NAME.exceedHeight)
    ;[...this.leftNavigationSubItems].forEach(element => {
      element.removeAttribute('style')
    })

    if (leftNavigationHeight > documentHeight) {
      this.leftNavigation.style.height = `${leftNavigationHeight}px`
      return
    }

    this.leftNavigation.removeAttribute('style')
  }

  /**
   * Events
   */

  _addClickEventToSubItems() {
    this.leftNavigation.addEventListener('click', event => {
      if (
        !hasClass(event.target, CLASS_NAME.leftNavigationSubItem) ||
        hasClass(event.target, CLASS_NAME.hasSubItems)
      ) return

      this.changeActiveState(event.target)
    })
  }

  _addClickEventToItemsWithSubItems() {
    [...this.leftNavigationItem, ...this.leftNavigationSubItem].forEach(element => {
      element.addEventListener('click', event => {
        if (!hasClass(event.currentTarget, CLASS_NAME.hasSubItems)) return

        this.toggleSubItems(event.currentTarget)
      })
    })
  }

  _initialize() {
    const isMobile = TABLET_BREAKPOINT > window.innerWidth
    const isExpanded = window.localStorage.getItem('nav-state') === 'expanded'

    let resetComputedValues

    this._temporaryDisableAnimations()
    this.setState()
    this.updateTheme()
    this._addClickEventToItemsWithSubItems()
    this._addClickEventToSubItems()

    if (!isMobile && !isExpanded) {
      window.onload = () => {
        this.setMenuHeight()
        this.setSubMenuMaxHeight()
      }
    }

    window.onresize = () => {
      if (resetComputedValues) clearTimeout(resetComputedValues)

      resetComputedValues = setTimeout(() => {
        if (!isMobile && !isExpanded) {
          this.setMenuHeight()
          this.setSubMenuMaxHeight()
        }
      }, 200)
    }
  }
}

let initialized = false

export default () => {
  if (initialized === true) return

  const leftNavigation = Q(SELECTOR.leftNavigation)[0]
  if (!leftNavigation) return

  RAUL = window.RAUL || {}
  RAUL.leftNavigation = new LeftNavigation(leftNavigation)

  initialized = true
}

export { LeftNavigation }
