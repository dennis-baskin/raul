<template>
  <div class="raul-carousel-container" :class="hasGreyBackground">
    <h2 v-if="carouselTitle">{{ carouselTitle }}</h2>

    <div class="raul-carousel" :class="carouselType">
      <a href="#" class="prev raul-carousel-icon-left">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>

      <a href="#" class="next raul-carousel-icon-right">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>

      <div class="visible-area">
        <ul class="row raul-carousel-items" ref="carousel-slides">
          <slot></slot>
          <slot-template></slot-template>
        </ul>

        <div class="raul-carousel-dots" v-if="isCardType"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    data() {
      return {
        carouselSlides: [],
      }
    },

    props: {
      carouselTitle: String,
      type: String,
      greyBackground: Boolean,
    },

    computed: {
      carouselType() {
        if (this.type) return `raul-carousel-${this.type}`
      },

      isCardType() {
        return this.type === 'cards'
      },

      hasGreyBackground() {
        return this.greyBackground === true ? 'raul-carousel-container-grey' : null
      }
    },

    mounted() {
      if (!this.type) return

      const slidesContainer = this.$refs['carousel-slides']
      this.carouselSlides = [...slidesContainer.children].filter(children => {
        return children.tagName.match(/ui-/gi)
      })

      this.carouselSlides.forEach((carouselSlide) => {
        carouselSlide.setAttribute('type', this.type)
      })
    }
  }
</script>
