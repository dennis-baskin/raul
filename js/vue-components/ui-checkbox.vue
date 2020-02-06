<template>
  <label class="raul-checkbox-wrapper">
    <span class="raul-form-input-text">
      <slot></slot>
      <slot-template></slot-template>
    </span>

    <input type="checkbox" :checked="checked" />

    <span class="raul-checkbox-checkmark"></span>
  </label>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    props: {
      checked: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
