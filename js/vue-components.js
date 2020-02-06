import Vue from 'vue/dist/vue.esm.js'
import VueCollapse from 'vue2-collapse'
import vueCustomElement from 'vue-custom-element/dist/vue-custom-element.esm.js'

import getStore from './vue-store'
import setClickOutsideDirective from './vue-directives/click-outside'
import setMultipleRefs from './vue-directives/refs'

import UiHeader from './vue-shell/ui-header.vue'
import UiLeftNav from './vue-shell/ui-left-nav.vue'
import UiMainContent from './vue-shell/ui-main-content.vue'
import UiPageHeader from './vue-shell/ui-page-header.vue'
import UiShell from './vue-shell/ui-shell.vue'
import UiUserLink from './vue-shell/ui-user-link.vue'
import UiUnifiedNavbarItem from './vue-shell/ui-unified-navbar-item.vue'

import UiActionMenu from './vue-components/ui-action-menu/ui-action-menu.vue'
import UiActionMenuItem from './vue-components/ui-action-menu/ui-action-menu-item.vue'
import UiAlert from './vue-components/ui-alert.vue'
import UiCard from './vue-components/ui-card.vue'
import UiCarousel from './vue-components/ui-carousel/ui-carousel.vue'
import UiCarouselSlide from './vue-components/ui-carousel/ui-carousel-slide.vue'
import UiCarouselItem from './vue-components/ui-carousel/ui-carousel-item.vue'
import UiCheckbox from './vue-components/ui-checkbox.vue'
import UiDatepicker from './vue-components/ui-datepicker.vue'
import UiIcon from './vue-components/ui-icon.vue'
import UiInfoCard from './vue-components/ui-info-card.vue'
import UiDropdownSelect from './vue-components/ui-dropdown-select/ui-dropdown-select.vue'
import UiDropdownSelectGroup from './vue-components/ui-dropdown-select/ui-dropdown-select-group.vue'
import UiDropdownSelectItem from './vue-components/ui-dropdown-select/ui-dropdown-select-item.vue'

const store = getStore(Vue)

setClickOutsideDirective(Vue)
setMultipleRefs(Vue)

Vue.use(vueCustomElement)
Vue.use(VueCollapse)

RAUL._Vue = Vue

UiHeader.store = store
UiLeftNav.store = store
UiMainContent.store = store
UiShell.store = store
UiIcon.store = store

const ignoreElements = [
  // shell
  'slot-template',
  'ui-header',
  'ui-left-nav',
  'ui-main-content',
  'ui-page-header',
  'ui-shell',
  'ui-user-link',
  'ui-unified-navbar-item',

  // components
  'ui-alert',
  'ui-card',
  'ui-carousel',
  'ui-carousel-wrapper',
  'ui-carousel-slide',
  'ui-carousel-item',
  'ui-checkbox',
  'ui-datepicker',
  'ui-icon',
  'ui-info-card',
  'ui-action-menu',
  'ui-action-menu-item',
  'ui-dropdown-select',
  'ui-dropdown-select-item',
]

const vNgTags = [...document.querySelectorAll('[v-ng]')].map(element => element.tag)

;[...vNgTags, ...ignoreElements].forEach(tag => {
  Vue.config.ignoredElements.push(new RegExp(tag, 'i'))
})

Vue.customElement('ui-header', UiHeader)
Vue.customElement('ui-left-nav', UiLeftNav)
Vue.customElement('ui-main-content', UiMainContent)
Vue.customElement('ui-page-header', UiPageHeader)
Vue.customElement('ui-shell', UiShell)
Vue.customElement('ui-user-link', UiUserLink)
Vue.customElement('ui-unified-navbar-item', UiUnifiedNavbarItem)

Vue.customElement('ui-action-menu', UiActionMenu)
Vue.customElement('ui-action-menu-item', UiActionMenuItem)
Vue.customElement('ui-alert', UiAlert)
Vue.customElement('ui-card', UiCard)
Vue.customElement('ui-carousel', UiCarousel)
Vue.customElement('ui-carousel-slide', UiCarouselSlide)
Vue.customElement('ui-carousel-item', UiCarouselItem)
Vue.customElement('ui-checkbox', UiCheckbox)
Vue.customElement('ui-datepicker', UiDatepicker)
Vue.customElement('ui-icon', UiIcon)
Vue.customElement('ui-info-card', UiInfoCard)
Vue.customElement('ui-dropdown-select', UiDropdownSelect)
Vue.customElement('ui-dropdown-select-group', UiDropdownSelectGroup)
Vue.customElement('ui-dropdown-select-item', UiDropdownSelectItem)

window.RAUL.ui = {
  /**
   * Add a custom callback to a header search event
   * @param {String} eventType - The event which will call the callback
   * @param {function(event, value)} callback - The callback to register for the specified event
   */
  bindSearchEvent(eventType, callback) {
    store.commit('bindSearchEvents', {
      eventType: eventType,
      callback: callback,
    })
  },

  setAppSwitcherData(data) {
    store.commit('setAppSwitcherData', data)
  },
}
