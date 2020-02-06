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
import UiIcon from './vue-components/ui-icon.vue'

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
  'slot-template',
  'ui-header',
  'ui-left-nav',
  'ui-main-content',
  'ui-page-header',
  'ui-shell',
  'ui-user-link',
  'ui-unified-navbar-item',
  'ui-icon',
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
Vue.customElement('ui-icon', UiIcon)

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
