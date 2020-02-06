<template>
  <a class="list-group-item" :class="customClasses" :href="href">
    <slot></slot>
    <slot-template v-refs:slots></slot-template>
  </a>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixin: [slots],

    props: [
      'customClasses',
      'href',
    ],
  }
</script>
