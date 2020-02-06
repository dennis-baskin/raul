import Vuex from 'vuex'

import appSwitcher from './modules/app-switcher'
import leftNav from './modules/left-nav'
import header from './modules/header'
import headerSearch from './modules/header-search'
import icons from './modules/icons'
import shared from './modules/shared'

export default (Vue) => {
  Vue.use(Vuex)

  return new Vuex.Store({
    modules: {
      appSwitcher,
      leftNav,
      header,
      headerSearch,
      icons,
      shared,
    },
  })
}
