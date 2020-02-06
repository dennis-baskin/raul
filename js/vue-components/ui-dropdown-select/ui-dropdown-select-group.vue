<template>
  <div class="dropdown-group" ref="dropdown-items">
    <div class="dropdown-row dropdown-row-header" v-if="groupTitle && !isMultipleSelect">
      <h6 class="dropdown-header section-title">
        {{ groupTitle }}
      </h6>
    </div>

    <div class="dropdown-row dropdown-row-header" v-if="groupTitle && isMultipleSelect">
      <h6 class="dropdown-header">
        <div class="custom-control custom-checkbox custom-control-right">
          <input type="checkbox" class="custom-control-input check-all" :id="generatedId">

          <label class="custom-control-label section-title" :for="generatedId">
            {{ groupTitle }}
          </label>
        </div>
      </h6>
    </div>

    <slot></slot>
    <slot-template></slot-template>
  </div>
</template>

<script>
  import { random, times } from 'lodash/fp'

  import slots from '../../vue-mixins/slots.mixin'

  export default {
    mixins: [slots],

    data() {
      return {
        randomString() {
          return times(() => random(0, 35).toString(36))(20).join('')
        },
        dropdownItems: [],
      }
    },

    props: {
      groupTitle: {
        type: String,
        required: true,
      },
      groupId: {
        String
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
    },

    computed: {
      isMultipleSelect() {
        return this.type === 'multiple'
      },
      generatedId() {
        return this.groupId ? this.groupId : `dropdown-${this.randomString()}`
      },
    },

    methods: {
      provideProp(ref, items, prop, propValue) {
        if (!propValue) return

        const itemsContainer = this.$refs[ref]

        items = [...itemsContainer.children].filter(children => {
          return children.tagName.match(/ui-/gi)
        })
        items.forEach((item) => {
          item.setAttribute(prop, propValue)
        })
      },
    },

    mounted() {
      this.provideProp('dropdown-items', this.dropdownItems, 'type', this.type)
      this.provideProp('dropdown-items', this.dropdownItems, 'name', this.name)
    },
  }
</script>