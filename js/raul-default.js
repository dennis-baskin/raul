import './base'

import './vue-components'

import './components/list-groups'
import './components/sortable'

import loadDropdowns, { MultiSelectCheckMarkDropdown, MultiSelectTypeAheadDropdown, SingleSelectDropdown } from './components/dropdown/dropdown-default'
import loadAccordions, { Accordion } from './components/accordions'
import loadAlerts, { Alert } from './components/alerts'
import { AppSwitcher } from './components/app-switcher'
import loadCarousels, { BasicCarousel, CardCarousel } from './components/carousel'
import loadCheckAll, { CheckAll } from './check-all'
import { Loader } from './components/loaders'
import loadTableFilters, { HeadingFilter } from './components/tables/heading-filters'
import loadBulkActions, { BulkAction } from './components/tables/bulk-actions'
import loadProgressBars from './components/progress-bar'
import loadNotifications, { Notification, Notifications } from './components/notifications'
import loadLeftNavigation, { LeftNavigation } from './components/omnibar/left-navigation'
import loadHeader, { Header } from './components/omnibar/header'

window.RAUL = {
  ...window.RAUL,

  IMAGE_CDN_URL: 'https://cdn.realpage.com/images/',

  Accordion,
  Alert,
  AppSwitcher,
  BasicCarousel,
  BulkAction,
  CardCarousel,
  CheckAll,
  HeadingFilter,
  Loader,
  MultiSelectCheckMarkDropdown,
  MultiSelectTypeAheadDropdown,
  Notification,
  Notifications,
  SingleSelectDropdown,
  LeftNavigation,
  Header,

  loadAccordions,
  loadAlerts,
  loadBulkActions,
  loadCarousels,
  loadCheckAll,
  loadDropdowns,
  loadNotifications,
  loadProgressBars,
  loadTableFilters,
  loadLeftNavigation,
  loadHeader,

  bootstrap: function() {
    loadAccordions()
    loadAlerts()
    loadBulkActions()
    loadCarousels()
    loadCheckAll()
    loadDropdowns()
    loadNotifications()
    loadProgressBars()
    loadTableFilters()
    loadLeftNavigation()
    loadHeader()
  },
}

if (RAUL.AUTOLOAD) {
  // Replace with DOMContentLoaded listener when jQuery is completely removed
  jQuery(RAUL.bootstrap)
}
