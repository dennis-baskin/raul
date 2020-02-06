<template>
  <div class="ui-header">
    <header class="raul-header">
      <transition name="fade" v-if="!hideLeftNav">
        <ui-icon
          icon="omnibar-hamburger"
          class="raul-header-menu-button"
          @click="toggleLeftNavExpanded"
          v-if="!isMobileSearchExpanded"
        ></ui-icon>
      </transition>

      <transition name="fade">
        <div class="raul-header-logo" v-if="!isMobileSearchExpanded">
          <img
            class="raul-header-logo-mobile"
            src="https://cdn.realpage.com/images/rp-logo-dots.svg"
            alt="RealPage Inc. Logo"
          />
        </div>
      </transition>

      <transition name="fade">
        <div class="raul-header-title" :class="headerTitleClass" v-if="!isMobileSearchExpanded">
          <h1 class="raul-header-product">{{productName}}</h1>

          <h2
            class="raul-header-company d-none d-sm-inline-block"
            :title="companyName"
            v-if="companyName"
          >
            {{companyName}}
          </h2>

          <span
            class="raul-header-divider d-none d-sm-inline-block"
            v-if="companyName && propertyName"
          >|</span>

          <div class="raul-header-properties" v-if="propertyName">
            {{propertyName}}
          </div>
        </div>
      </transition>

      <transition name="fade">
        <ui-user-context
          :user-name="userName"
          :user-title="userTitle"
          :logout-class="logoutClass"
          :logout-link="logoutLink"
          :user-settings-link="userSettingsLink"
          :user-settings-class="userSettingsClass"
          :hide-left-nav="hideLeftNav"
          :on-log-out-callback="onLogOutCallback"
          :on-user-settings-callback="onUserSettingsCallback"
          v-if="!isMobileSearchExpanded"
        >
          <template slot="additional-user-links">
            <slot name="additional-user-links"></slot>
            <slot-template name="additional-user-links" v-refs:slots></slot-template>
          </template>
        </ui-user-context>
      </transition>

      <transition name="fade">
        <div
          class="raul-header-more d-xl-none"
          v-if="!isMobileSearchExpanded"
          @click="toggleMoreContext"
        >
          <ui-icon
            icon="omnibar-more"
            class="raul-header-more-icon"
          ></ui-icon>
        </div>
      </transition>

      <transition name="fade">
        <div class="unified-navbar" v-if="!isMobileSearchExpanded">
          <ui-unified-navbar-item
            v-if="showHomeLink"
            :href="homeLink"
            :custom-icon="false"
            classes="raul-header-home"
            icon="omnibar-home"
          ></ui-unified-navbar-item>

          <ui-app-switcher v-if="showAppSwitcher"></ui-app-switcher>

          <ui-unified-navbar-item
            v-if="showHelpLink"
            :href="helpLink"
            :custom-icon="false"
            classes="raul-header-help"
            icon="omnibar-help"
          ></ui-unified-navbar-item>

          <ui-unified-navbar-item
            v-if="showSettingsLink"
            :href="settingsLink"
            icon="omnibar-cog"
          ></ui-unified-navbar-item>

          <ui-shopping
            :cart-count="shoppingCartCount"
            :show-shopping="showShopping"
            :shopping-link="shoppingLink"
            placement="header"
          >
            <template slot="shopping">
              <slot name="shopping-header"></slot>
              <slot-template name="shopping-header" v-refs:slots></slot-template>
            </template>
          </ui-shopping>

          <ui-notifications
            v-if="showNotifications"
            :notifications-link="notificationsLink"
            :notifications-count="notificationsCount"
          >
            <slot name="notifications"></slot>
            <slot-template name="notifications" v-refs:slots></slot-template>
          </ui-notifications>

          <slot name="custom-unified-navbar-items"></slot>
        </div>
      </transition>

      <ui-header-search v-if="showSearch"></ui-header-search>
    </header>

    <ui-header-more-context
      :show-shopping="showShopping"
      :user-name="userName"
      :user-title="userTitle"
      :help-link="helpLink"
      :home-link="homeLink"
      :settings-link="settingsLink"
      :shopping-link="shoppingLink"
      :shopping-cart-count="shoppingCartCount"
      :show-home-link="showHomeLink"
      :show-help-link="showHelpLink"
      :show-settings-link="showSettingsLink"
      :hide-left-nav="hideLeftNav"
      :logout-class="logoutClass"
      :logout-link="logoutLink"
      :user-settings-link="userSettingsLink"
      :user-settings-class="userSettingsClass"
      :on-log-out-callback="onLogOutCallback"
      :on-user-settings-callback="onUserSettingsCallback"
    >
      <template slot="shopping-more-context">
        <slot name="shopping-more-context"></slot>
        <slot-template name="shopping-more-context" v-refs:slots></slot-template>
      </template>

      <template slot="additional-user-links-more-context">
        <slot name="additional-user-links-more-context"></slot>
        <slot-template name="additional-user-links-more-context" v-refs:slots></slot-template>
      </template>
    </ui-header-more-context>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import { Api } from '../vue-mixins/api.mixin'
  import slots from '../vue-mixins/slots.mixin'

  import UiAppSwitcher from './ui-app-switcher.vue'
  import UiHeaderSearch from './ui-header-search.vue'
  import UiHeaderMoreContext from './ui-header-more-context.vue'
  import UiNotifications from './ui-notifications.vue'
  import UiShopping from './ui-shopping.vue'
  import UiUnifiedNavbarItem from './ui-unified-navbar-item.vue'
  import UiUserContext from './ui-user-context.vue'

  const api = Api({
    onLogOut: {
      get() {
        return this.onLogOutCallback
      },

      set(callback) {
        this.onLogOutCallback = callback
        return this.api
      }
    },

    onUserSettings: {
      get() {
        return this.onUserSettingsCallback
      },

      set(callback) {
        this.onUserSettingsCallback = callback
        return this.api
      }
    },
  })

  export default {
    mixins: [api, slots],

    data() {
      return {
        onLogOutCallback: () => {},
        onUserSettingsCallback: () => {},
      }
    },

    props: {
      productName: {
        type: String,
        default: 'RealPage',
      },

      companyName: String,
      propertyName: String,
      userName: String,
      userTitle: String,

      helpLink: {
        default: '#help',
        type: String,
      },

      homeLink: {
        default: '#home',
        type: String,
      },

      logoutClass: {
        default: 'log-out',
        type: String,
      },
      logoutLink: {
        default: '#log-out',
        type: String,
      },

      userSettingsClass: {
        default: 'log-out',
        type: String,
      },
      userSettingsLink: {
        default: '#log-out',
        type: String,
      },

      notificationsLink: {
        default: '#notifications',
        type: String,
      },

      settingsLink: {
        default: '#settings',
        type: String,
      },

      shoppingLink: {
        default: '#shopping',
        type: String,
      },

      notificationsCount: {
        default: null,
        type: Number,
      },

      shoppingCartCount: {
        default: null,
        type: Number,
      },

      showAppSwitcher: Boolean,
      showHelpLink: Boolean,
      showHomeLink: Boolean,
      showNotifications: Boolean,
      showSearch: Boolean,
      showSettingsLink: Boolean,
      showShopping: Boolean,

      hideLeftNav: Boolean,
    },

    components: {
      UiAppSwitcher,
      UiHeaderSearch,
      UiHeaderMoreContext,
      UiNotifications,
      UiShopping,
      UiUnifiedNavbarItem,
      UiUserContext,
    },

    computed: {
      ...mapGetters([
        'isMobileSearchExpanded',
      ]),

      headerTitleClass() {
        return this.companyName || this.propertyName ? 'has-sub-info' : null
      },
    },

    methods: {
      ...mapActions([
        'toggleMoreContext',
        'toggleLeftNavExpanded',
        'toggleUserContext',
      ]),
    },
  }
</script>
