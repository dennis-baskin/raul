<template>
  <div class="raul-carousel-item-wrapper center-vertically" v-if="isCardType">
    <div class="raul-carousel-item-text">
      <div class="raul-carousel-item-title" v-if="itemTitle">
        <span>{{ itemTitle }}</span>
      </div>

      <div class="raul-carousel-item-description" v-if="itemDescription">
        <span>{{ itemDescription }}</span>
      </div>

      <slot></slot>
      <slot-template></slot-template>
    </div>
  </div>

  <div class="raul-carousel-item-wrapper center-vertically" v-else>
    <div class="raul-carousel-item-title" v-if="itemTitle">
      <span>{{ itemTitle }}</span>
    </div>

    <div class="raul-carousel-item-description" v-if="itemDescription">
      <span>{{ itemDescription }}</span>
    </div>

    <slot></slot>
    <slot-template></slot-template>
  </div>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    props: {
      itemTitle: String,
      itemDescription: String,
      type: String,
    },

    computed: {
      isCardType() {
        return this.type === 'cards'
      },
    }
  }
</script>