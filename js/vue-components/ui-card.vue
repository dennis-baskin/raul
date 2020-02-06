<template>
  <div class="raul-card">
    <slot></slot>
    <slot-template></slot-template>
  </div>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],
  }
</script>
