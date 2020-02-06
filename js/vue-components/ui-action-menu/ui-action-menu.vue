<template>
  <div
    :class="classes"
    :id="itemId"
  >
    <a href="#" data-toggle="dropdown" v-if="hasSlot('title')">
      <slot name="title"></slot>
      <slot-template name="title"></slot-template>
    </a>

    <a href="#" data-toggle="dropdown" v-else>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </a>

    <div class="dropdown-menu" ref="items-container">
      <slot></slot>
      <slot-template></slot-template>
    </div>
  </div>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    data () {
      return {
        menuItems: [],
        defaultClass: 'raul-simple-dropdown',
        availableDirections: [
          'down',
          'left',
          'up',
          'right',
        ],
      }
    },

    props: {
      itemClass: {
        type: String,
        default: '',
      },

      itemId: String,

      direction: {
        type: String,
        default: 'drop',
      },
    },

    computed: {
      classes: function() {
        const validDirection = this.availableDirections.includes(this.direction)
        const defaultDirection = this.availableDirections[0]
        const type = `drop${validDirection ? this.direction : defaultDirection}`

        return `${this.defaultClass} ${type} ${this.itemClass}`
      }
    },

    methods: {
      hasSlot(slot) {
        return !!this.$slots[slot]
      },
    },

    mounted() {
      const itemsContainer = this.$refs['items-container']
      this.menuItems = [...itemsContainer.children].filter(child => child.tagName.match(/ui-/gi))
    },
  }
</script>
