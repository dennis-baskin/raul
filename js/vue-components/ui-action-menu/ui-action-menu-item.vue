<template>
  <a
    :class="classes"
    :href="url"
    :id="itemId"
  >
    <slot></slot>
    <slot-template></slot-template>
  </a>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    data () {
      return {
        defaultClass: 'dropdown-item',
        disabledClass: 'disabled',
      }
    },

    props: {
      url: {
        default: '#',
        type: String,
      },
      itemClass: String,
      itemId: String,
      disabled: Boolean,
    },

    computed: {
      classes: function() {
        const disabledClass = this.disabled ? this.disabledClass : ''
        return `${this.defaultClass} ${disabledClass} ${this.itemClass}`
      }
    }
  }
</script>
