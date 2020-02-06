<template>
  <li class="raul-carousel-item" :data-index="index" ref="carousel-items">
    <slot></slot>
    <slot-template></slot-template>
  </li>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    data() {
      return {
        carouselItems: [],
      }
    },

    props: {
      index: Number,
      type: String,
    },

    mounted() {
      if (!this.type) return

      const itemsContainer = this.$refs['carousel-items']
      this.carouselItems = [...itemsContainer.children].filter(children => {
        return children.tagName.match(/ui-/gi)
      })

      this.carouselItems.forEach((carouselItem) => {
        carouselItem.setAttribute('type', this.type)
      })
    }
  }
</script>