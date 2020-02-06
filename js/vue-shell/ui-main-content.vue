<template>
  <main class="raul-page-container" :id="pageContentId" :class="containerClass">
    <section class="container-fluid position-relative">
      <slot></slot>
      <slot name="content"></slot>
      <slot-template v-refs:slots></slot-template>
      <slot-template name="content" v-refs:slots></slot-template>
    </section>
  </main>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    props: {
      pageContentId: String,
      hideLeftNav: Boolean,
      noContentPadding: Boolean,
    },

    computed: {
      containerClass() {
        const paddingClasses = this.noContentPadding ? '' : 'mt-3 mb-5'
        const leftNavClass = this.hideLeftNav ? 'hide-left-nav' : ''

        return `${paddingClasses} ${leftNavClass}`
      }
    },

    mounted() {
      // Temporaraly disables animation for initial state load
      // workaround to support old nav toggling until nav is included in vue components
      ;[
        document.querySelector('.raul-page-container'),
      ].forEach((element) => {
        if (!element) return

        element.classList.add('no-transition')
        setTimeout(() => element.classList.remove('no-transition'), 300)
      })
    },
  }
</script>
