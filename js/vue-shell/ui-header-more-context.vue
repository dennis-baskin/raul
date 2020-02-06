<template>
  <div
    class="raul-header-more-context d-xl-none"
    :class="{expanded: isMoreContextOpened}"
    v-click-outside="hide"
  >
    <div class="raul-header-more-context-inner">
      <v-collapse-wrapper v-if="userName">
        <div class="raul-header-user clearfix d-sm-none" v-collapse-toggle>
          <div class="raul-header-user-avatar">{{initials}}</div>

          <div class="raul-header-user-info">
            <p class="raul-header-user-handle m-0">{{userName}}</p>
            <p class="raul-header-user-title m-0">{{userTitle}}</p>
          </div>

          <ui-icon
            icon="omnibar-angle-down"
            class="raul-header-user-angle"
          ></ui-icon>
        </div>

        <div v-collapse-content>
          <div class="list-group">
            <slot name="additional-user-links"></slot>

            <a
              class="list-group-item more-context-item"
              :class="userSettingsClass"
              :href="userSettingsLink"
              @click="onUserSettingsCallback"
            >
              User Settings
            </a>

            <a
              class="list-group-item more-context-item"
              :class="logoutClass"
              :href="logoutLink"
              @click="onLogOutCallback"
            >
              Log Out
            </a>

            <div
              class="list-group-item toggle-switch more-context-item"
              @click="toggleLeftNavTheme"
              v-if="!hideLeftNav"
            >
              Dark Navigation: <ui-icon :icon="toggleIcon"></ui-icon>
            </div>
          </div>
        </div>
      </v-collapse-wrapper>

      <ui-shopping
        placement="more-context"
        :cart-count="shoppingCartCount"
        :show-shopping="showShopping"
        :shopping-link="shoppingLink"
      >
        <template slot="shopping">
          <slot name="shopping-more-context"></slot>
        </template>
      </ui-shopping>

      <slot name="additional-user-links-more-context"></slot>

      <a class="raul-header-context-home more-context-item" :href="homeLink" v-if="showHomeLink">
        <ui-icon
          icon="omnibar-home"
          class="raul-header-home"
        ></ui-icon>

        <span>Home</span>
      </a>

      <a class="raul-header-context-help more-context-item" :href="helpLink" v-if="showHelpLink">
        <ui-icon
          icon="omnibar-help"
          class="raul-header-help"
        ></ui-icon>

        <span>Help</span>
      </a>

      <a class="raul-header-context-custom more-context-item" :href="settingsLink" v-if="showSettingsLink">
        <ui-icon
          icon="omnibar-cog"
          class="raul-header-custom-icon"
        ></ui-icon>

        <span>Settings</span>
      </a>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import slots from '../vue-mixins/slots.mixin'

  import UiShopping from './ui-shopping.vue'

  export default {
    mixin: [slots],

    props: {
      showShopping: Boolean,
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

      settingsLink: {
        default: '#settings',
        type: String,
      },

      shoppingLink: {
        default: '#shopping',
        type: String,
      },

      shoppingCartCount: Number,
      showHelpLink: Boolean,
      showHomeLink: Boolean,
      showSettingsLink: Boolean,

      hideLeftNav: Boolean,

      logoutClass: {
        default: 'log-out',
        type: String,
      },
      logoutLink: {
        default: '#log-out',
        type: String,
      },
      onLogOutCallback: Function,

      userSettingsClass: {
        default: 'user-settings',
        type: String,
      },
      userSettingsLink: {
        default: '#user-settings',
        type: String,
      },
      onUserSettingsCallback: Function,
    },

    components: {
      UiShopping,
    },

    computed: {
      ...mapGetters([
        'isMoreContextOpened',
        'leftNavTheme',
      ]),

      initials() {
        const nameBoundaryRegex = /\b\s*/
        const userName = this.userName.trim()
        const userNames = userName.split(nameBoundaryRegex)
        const {0: firstName, length: namesLength, [namesLength - 1]: lastName} = userNames
        return [firstName, lastName].map(name => name.charAt(0).toUpperCase()).join('')
      },

      toggleIcon() {
        return `omnibar-toggle-${this.leftNavTheme === 'dark' ? 'on' : 'off'}`
      },
    },

    methods: {
      ...mapActions(['closeMoreContext', 'toggleLeftNavTheme']),

      hide(event) {
        if (
          event.target.classList.contains('raul-header-more') ||
          event.target.closest('.raul-header-more')
        ) return

        this.closeMoreContext()
      },
    },
  }
</script>

<style scoped>
  .expanded {
    box-shadow: rgba(0, 0, 0, 0.2) -4px 0px 16px 0px;
    width: 300px;
  }

  .list-group-item {
    border-left: 0;
    border-right: 0;
  }
</style>
