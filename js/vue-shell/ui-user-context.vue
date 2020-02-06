<template>
  <v-collapse-wrapper
    class="raul-header-user d-none d-sm-block"
    v-if="userName"
    v-click-outside="hide"
    ref="header-user"
  >
    <div class="clearfix" v-collapse-toggle>
      <div class="raul-header-user-info d-md-inline-flex">
        <p class="raul-header-user-handle d-none d-md-block m-0">
          {{userName}}
        </p>

        <p class="raul-header-user-title d-none d-md-block m-0" v-if="userTitle">
          {{userTitle}}
        </p>
      </div>

      <div class="raul-header-user-avatar">{{initials}}</div>

      <ui-icon
        icon="omnibar-angle-down"
        class="raul-header-user-angle"
      ></ui-icon>
    </div>

    <div class="raul-user-context" v-collapse-content>
      <div class="list-group">
        <slot name="additional-user-links"></slot>

        <a
          class="list-group-item"
          :href="userSettingsLink"
          :class="userSettingsClass"
          @click="onUserSettingsCallback"
        >
          User Settings
        </a>

        <a
          class="list-group-item"
          :href="logoutLink"
          :class="logoutClass"
          @click="onLogOutCallback"
        >
          Log Out
        </a>

        <div class="list-group-item toggle-switch" @click="toggleLeftNavTheme" v-if="!hideLeftNav">
          Dark Navigation: <ui-icon :icon="toggleIcon"></ui-icon>
        </div>
      </div>
    </div>
  </v-collapse-wrapper>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: {
      userName: String,
      userTitle: String,

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

      hideLeftNav: Boolean,
    },

    computed: {
      ...mapGetters([
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
      ...mapActions(['toggleLeftNavTheme']),

      hide() {
        this.$refs['header-user'].close()
      },
    },

    created() {
      if (window.localStorage.getItem('nav-theme') === 'dark') this.toggleLeftNavTheme()
    },
  }
</script>

<style scoped>
  .raul-user-context {
    display: block;
    position: absolute;
    right: 0;
    top: 56px;
    transition-duration: 0.35s;
  }
</style>
