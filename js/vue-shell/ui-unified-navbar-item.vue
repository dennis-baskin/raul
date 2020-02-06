<template>
  <div class="unified-navbar-item" :class="dislplayClasses">
    <a :href="href" @click="$emit('click', $event)" v-if="icon">
      <ui-icon
        :icon="icon"
        :class="[customIconClass, iconClass]"
        :data-badge="badge"
      ></ui-icon>
    </a>

    <slot></slot>
    <slot-template v-refs:slots></slot-template>
  </div>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    props: {
      showForAllMediaSizes: Boolean,
      href: String,
      classes: {
        default: '',
        type: String,
      },
      icon: String,

      badge: {
        default: null,
        type: Number,
      },

      customIcon: {
        default: true,
        type: Boolean,
      },
    },

    computed: {
      dislplayClasses() {
        return this.showForAllMediaSizes ? '' : 'd-none d-lg-inline-block'
      },

      iconClass() {
        if (!this.classes) return
        const badgeClass = this.badge ? '' : 'no-badge'
        return `${this.classes} ${badgeClass}`
      },

      customIconClass() {
        return this.customIcon ? 'raul-header-custom-icon' : ''
      }
    },
  }
</script>
