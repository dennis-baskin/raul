<template>
  <transition name="fade">
    <div class="alert" :class="alertType" role="alert" v-if="show">
      <h4 class="alert-heading" v-if="hasSlot('heading')">
        <slot name="heading"></slot>
      </h4>

      <div v-if="hasSlot('default')">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      type: {
        default: 'info',
        type: String,
      },

      checked: {
        type: Boolean,
        default: false,
      },

      show: Boolean,
    },

    computed: {
      alertType() {
        return `alert-${this.type}`
      },
    },

    methods: {
      hasSlot(slot) {
        return !!this.$slots[slot]
      },
    },
  }
</script>
