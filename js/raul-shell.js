import './shell-base'

import './vue-shell'

import { AppSwitcher } from './components/app-switcher'

import loadLeftNavigation, { LeftNavigation } from './components/omnibar/left-navigation'
import loadHeader, { Header } from './components/omnibar/header'

window.RAUL = {
  ...window.RAUL,

  IMAGE_CDN_URL: 'https://cdn.realpage.com/images/',

  AppSwitcher,
  LeftNavigation,
  Header,

  loadLeftNavigation,
  loadHeader,
}

document.addEventListener('DOMContentLoaded', () => {
  loadLeftNavigation()
  loadHeader()
})
