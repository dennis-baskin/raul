export const TABLET_BREAKPOINT = 992
export const timeoutTime = 600
const RAUL_PREFIX = 'raul'

export const EVENT = {
  blur: 'blur',
  click: 'click',
  DOMLoaded: 'DOMContentLoaded',
  resize: 'resize',
}

export const ELEMENT = {
  header: 'header',
  pageHeader: 'pageHeader',
  breadcrumbsDropdown: 'breadcrumbsDropdown',
  breadcrumbBack: 'breadcrumbBack',
  breadcrumbs: 'breadcrumbs',
  leftnav: 'leftnav',
  leftnavItems: 'leftnavItems',
  leftnavTrigger: 'leftnavTrigger',
  themeToggle: 'themeToggle',
  subItems: 'subItems',
  logo: 'logo',
  title: 'title',
  company: 'company',
  secondaryTitleElements: 'secondaryTitleElements',
  search: 'search',
  searchMobile: 'searchMobile',
  searchMobileTrigger: 'searchMobileTrigger',
  homeTrigger: 'homeTrigger',
  helpTrigger: 'helpTrigger',
  settingsTrigger: 'settingsTrigger',
  user: 'user',
  userTrigger: 'userTrigger',
  notifications: 'notifications',
  notificationsTrigger: 'notificationsTrigger',
  shopping: 'shopping',
  shoppingTrigger: 'shoppingTrigger',

  more: 'more',
  moreTrigger: 'moreTrigger',
  moreUserTrigger: 'moreUserTrigger',
  moreUser: 'moreUser',
  moreHomeTrigger: 'moreHomeTrigger',
  moreHelpTrigger: 'moreHelpTrigger',
  moreShopping: 'moreShopping',
  moreShoppingTrigger: 'moreShoppingTrigger',
  moreSettingsTrigger: 'moreSettingsTrigger',

  navigation: 'navigation',
  switcherTrigger: 'switcherTrigger',
  switcher: 'switcher',
  navState: 'nav-state',
  navTheme: 'nav-theme',
}

export const CLASS = {
  display: {
    displaySMBlock: 'd-sm-block',
    displaySMNone: 'd-sm-none',
    displayXLNone: 'd-xl-none',
  },
  fontAwesome: {
    toggleOff: 'fa-toggle-off',
    toggleOn: 'fa-toggle-on',
  },
  raul: {
    lightTheme: `${RAUL_PREFIX}-left-navigation-light`,
    darkTheme: `${RAUL_PREFIX}-left-navigation-dark`,
    leftNavOpenMobile: `${RAUL_PREFIX}-left-navigation-mobile-open`,
    leftNavExpanded: `${RAUL_PREFIX}-left-navigation-expanded`,
    hasSubInfo: 'has-sub-info',
  },
}

export const SELECTOR = {
  body: 'body',
  icon: 'i',
  main: {
    header: `#${RAUL_PREFIX}-header`,
    leftNav: `#${RAUL_PREFIX}-left-navigation`,
    themeToggle: '.leftNavToggle, .left-nav-toggle',
    leftNavItem: `.${RAUL_PREFIX}-left-navigation-item`,
    leftNavSubItems: `.${RAUL_PREFIX}-left-navigation-subitems`,
    pageHeader: `#${RAUL_PREFIX}-page-header`,
    breadcrumbsDropdown: `#${RAUL_PREFIX}-page-header-breadcrumbs-dropdown`,
    breadcrumbBack: `#${RAUL_PREFIX}-page-header-breadcrumbs-back`,
    menuButton: `#${RAUL_PREFIX}-header-menu-button`,
    logo: `#${RAUL_PREFIX}-header-logo`,
    title: `.${RAUL_PREFIX}-header-title`,
    company: `.${RAUL_PREFIX}-header-company`,
    secondaryTitleElements: `.${RAUL_PREFIX}-header-company, .${RAUL_PREFIX}-header-properties, .${RAUL_PREFIX}-header-divider`,
    searchInput: `#${RAUL_PREFIX}-header-search-input`,
    searchInputMobile: `#${RAUL_PREFIX}-header-search-input-mobile`,
    searchIconMobile: `#${RAUL_PREFIX}-header-search-icon-mobile`,
    home: `#${RAUL_PREFIX}-header-home`,
    help: `#${RAUL_PREFIX}-header-help`,
    settings: `#${RAUL_PREFIX}-header-settings`,
    user: `#${RAUL_PREFIX}-header-user`,
    userContext: `#${RAUL_PREFIX}-user-context`,
    notifications: `#${RAUL_PREFIX}-header-notifications`,
    notificationContext: `#${RAUL_PREFIX}-notifications-context`,
    shoppingContext: `#${RAUL_PREFIX}-shopping-context`,

    appSwitcher: `#${RAUL_PREFIX}-header-app-switcher`,
    switcherContext: `.${RAUL_PREFIX}-switcher-context`,
    handle: `.${RAUL_PREFIX}-header-user-handle`,
    avatar: `.${RAUL_PREFIX}-header-user-avatar`,
    navBarItem: '.icon-container, .unified-navbar-item',
    dataUrl: 'data-url',
  },
  more: {
    helpContext: `.${RAUL_PREFIX}-header-context-help`,
    homeContext: `.${RAUL_PREFIX}-header-context-home`,
    moreContext: `#${RAUL_PREFIX}-header-more-context`,
    more: `#${RAUL_PREFIX}-header-more`,
    settingsTrigger: `#${RAUL_PREFIX}-header-custom`,
    shopping: `#${RAUL_PREFIX}-header-shopping`,
    shoppingContext: `.${RAUL_PREFIX}-header-context-shopping`,
    user: `.${RAUL_PREFIX}-header-user`,
  },
}
