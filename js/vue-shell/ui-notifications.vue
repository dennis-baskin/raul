<template>
  <ui-unified-navbar-item
    :href="notificationsLink || '#notifications'"
    :custom-icon="false"
    v-on="listeners"
    show-for-all-media-sizes
    icon="omnibar-notifications"
    classes="raul-header-notifications"
    :badge="notificationsCount"
  >
    <transition name="fade">
      <div class="ui-notifications-context" v-click-outside="hide" v-if="opened">
        <div class="ui-notifications-context-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </ui-unified-navbar-item>
</template>

<script>
  import UiUnifiedNavbarItem from './ui-unified-navbar-item.vue'

  export default {
    props: {
      notificationsLink: {
        default: '',
        type: String,
      },

      notificationsCount: {
        default: null,
        type: Number,
      },
    },

    components: {
      UiUnifiedNavbarItem,
    },

    data() {
      return {
        opened: false,
      }
    },

    computed: {
      listeners() {
        if (this.notificationsLink === '') return { click: this.toggleOpened }
        return null
      },
    },

    methods: {
      hide() {
        this.opened = false
      },

      toggleOpened(event) {
        event.preventDefault()
        this.opened = !this.opened
      },
    }
  }
</script>

<style scoped>
  .raul-header-notifications.no-badge::after {
    display: none;
  }

  .ui-notifications-context {
    min-height: auto;
    right: -22px;
    top: 46px;
  }
</style>
