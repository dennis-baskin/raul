<template>
  <v-collapse-wrapper :class="wrapperClass" ref="shopping-toggle" v-if="showShopping">
    <a :href="shoppingLink" v-on="listeners" v-if="placement === 'header'">
      <ui-icon
        icon="omnibar-shopping-cart"
        class="raul-header-shopping d-none d-xl-inline-block"
        :class="noBadgeClass"
        :data-badge="cartCount"
      ></ui-icon>
    </a>

    <transition name="fade" v-if="placement === 'header' && shoppingLink === ''">
      <div class="ui-shopping-context" v-click-outside="hide" v-if="opened">
        <div class="ui-shopping-context-content">
          <slot name="shopping"></slot>
        </div>
      </div>
    </transition>

    <a
      class="more-context-item"
      :href="shoppingLink"
      v-collapse-toggle
      v-if="placement === 'more-context'"
      v-on="listeners"
    >
      <ui-icon
        icon="omnibar-shopping-cart"
        class="raul-header-shopping"
        :class="noBadgeClass"
        :data-badge="cartCount"
      ></ui-icon>
      Shopping
    </a>

    <div
      class="shopping-more-context"
      v-collapse-content
      v-if="placement === 'more-context' && shoppingLink === ''"
    >
      <div class="shopping-more-context-content">
        <slot name="shopping"></slot>
      </div>
    </div>
  </v-collapse-wrapper>
</template>

<script>
  export default {
    props: {
      cartCount: {
        default: null,
        type: Number,
      },

      placement: {
        default: 'header',
        type: String,
      },

      shoppingLink: String,

      showShopping: {
        default: false,
        type: Boolean,
      },
    },

    data() {
      return {
        opened: false,
      }
    },

    computed: {
      noBadgeClass() {
        return this.cartCount ? null : 'no-badge'
      },

      listeners() {
        if (this.shoppingLink !== '') return null
        return { click: this.toggleOpened }
      },

      wrapperClass() {
        return this.placement === 'header' ? 'unified-navbar-item' : null
      }
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
  .raul-header-shopping.no-badge::after {
    display: none;
  }

  .ui-shopping-context {
    min-height: auto;
    right: -30px;
    top: 46px;
  }

  .shopping-more-context-content {
    border-bottom: 1px solid #e4e6e7;
    padding: 1rem;
    min-height: 100px;
  }
</style>
