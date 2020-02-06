<template>
  <div class="ui-shell">
    <ui-header
      :product-name="productName"
      :company-name="companyName"
      :property-name="propertyName"
      :user-name="userName"
      :user-title="userTitle"
      :help-link="helpLink"
      :home-link="homeLink"
      :logout-class="logoutClass"
      :logout-link="logoutLink"
      :notifications-link="notificationsLink"
      :settings-link="settingsLink"
      :shopping-link="shoppingLink"
      :user-settings-class="userSettingsClass"
      :user-settings-link="userSettingsLink"
      :notifications-count="notificationsCount"
      :shopping-cart-count="shoppingCartCount"
      :show-app-switcher="showAppSwitcher"
      :show-notifications="showNotifications"
      :show-help-link="showHelpLink"
      :show-home-link="showHomeLink"
      :show-search="showSearch"
      :show-settings-link="showSettingsLink"
      :show-shopping="showShopping"
      :hide-left-nav="hideLeftNav"
    >
      <template slot id="additional-user-links">
        <slot name="additional-user-links"></slot>
        <slot-template name="additional-user-links" v-refs:slots></slot-template>
      </template>

      <template slot id="shopping-header">
        <slot name="shopping-header"></slot>
        <slot-template name="shopping-header" v-refs:slots></slot-template>
      </template>

      <template slot id="notifications">
        <slot name="notifications"></slot>
        <slot-template name="notifications" v-refs:slots></slot-template>
      </template>

      <template slot id="shopping-more-context">
        <slot name="shopping-more-context"></slot>
        <slot-template name="shopping-more-context" v-refs:slots></slot-template>
      </template>

      <template slot id="additional-user-links-more-context">
        <slot name="additional-user-links-more-context"></slot>
        <slot-template name="additional-user-links-more-context" v-refs:slots></slot-template>
      </template>

      <template slot id="custom-unified-navbar-items">
        <slot name="custom-unified-navbar-items"></slot>
        <slot-template name="custom-unified-navbar-items" v-refs:slots></slot-template>
      </template>
    </ui-header>

    <ui-left-nav v-if="!hideLeftNav">
      <slot name="left-nav"></slot>
      <slot-template name="left-nav" v-refs:slots></slot-template>
    </ui-left-nav>

    <ui-page-header
      :domain="domain"
      :domain-link="domainLink"
      :page="page"
      :page-link="pageLink"
      :subpage="subpage"
      :subpage-link="subpageLink"
      :hide-left-nav="hideLeftNav"
    ></ui-page-header>

    <ui-main-content :page-content-id="pageContentId" :hide-left-nav="hideLeftNav" :no-content-padding="noContentPadding">
      <slot name="content"></slot>
      <slot></slot>
      <slot-template name="content" v-refs:slots></slot-template>
      <slot-template v-refs:slots></slot-template>
    </ui-main-content>
  </div>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

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
        default: 'user-settings',
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

      // page-header related items
      domain: String,
      domainLink: String,
      page: String,
      pageLink: String,
      subpage: String,
      subpageLink: String,

      // page-content related items
      noContentPadding: {
        default: false,
        type: Boolean,
      },

      pageContentId: {
        default: null,
        type: String,
      }
    },
  }
</script>

<style scoped>
  .ui-shell {
    overflow: auto;
  }
</style>
