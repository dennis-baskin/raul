<template>
  <div
    class="raul-dropdown-select"
    :class="[noBorderClass, smallSizeClass, multipleSelectClass, typeAheadClasses]"
  >
    <div class="dropdown-toggle" v-if="isTypeAhead">
      <div class="dropdown-toggle-content">
        <span class="dropdown-title">{{ dropdownTitle }}</span>

        <i class="fa fa-plus dropdown-chips-plus-icon" aria-hidden="true"></i>
      </div>

      <div class="dropdown-chips">
        <i class="fa fa-plus dropdown-chips-plus-icon" aria-hidden="true"></i>

        <input
          type="search"
          class="dropdown-search-input"
        >
      </div>
    </div>

    <div class="dropdown-toggle" v-else>
      <div class="dropdown-toggle-content">
        <span class="dropdown-title">{{ dropdownTitle }}</span>

        <i class="fa fa-chevron-down dropdown-arrow" aria-hidden="true"></i>
      </div>
    </div>

    <div class="dropdown-menu">
      <ui-dropdown-select-search
        :search-text="searchText"
        v-if="!isTypeAhead"
      ></ui-dropdown-select-search>

      <div class="dropdown-body" ref="dropdown-groups" v-if="grouped">
        <div class="dropdown-search-not-found-wrapper">
          <h6 class="dropdown-header">{{ searchFailedText }}</h6>
        </div>

        <slot></slot>
        <slot-template></slot-template>
      </div>

      <div class="dropdown-body" v-else>
        <div class="dropdown-search-not-found-wrapper">
          <h6 class="dropdown-header">{{ searchFailedText }}</h6>
        </div>

        <div class="dropdown-group" ref="dropdown-items">
          <slot></slot>
          <slot-template></slot-template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slots from '../../vue-mixins/slots.mixin'

  import UiDropdownSelectSearch from './ui-dropdown-select-search.vue'

  export default {
    mixins: [slots],

    data() {
      return {
        dropdownGroups: [],
        dropdownItems: [],
      }
    },

    props: {
      dropdownTitle: {
        type: String,
        required: true,
      },
      grouped: {
        type: Boolean,
      },
      name: {
        type: String,
        required: true,
      },
      noBorder: {
        type: Boolean,
      },
      searchText: {
        type: String,
        default: 'Search...',
      },
      searchFailedText: {
        type: String,
        default: 'No items found',
      },
      smallSize: {
        type: Boolean,
      },
      type: {
        String,
      }
    },

    components: {
      UiDropdownSelectSearch,
    },

    computed: {
      noBorderClass() {
        return this.noBorder ? 'dropdown-no-border' : null
      },
      smallSizeClass() {
        return this.smallSize ? 'dropdown-sm' : null
      },
      multipleSelectClass() {
        return this.type === 'multiple' ? 'dropdown-multiple' : null
      },
      typeAheadClasses() {
        return this.type === 'type-ahead' ? 'dropdown-multiple dropdown-multiple-type-ahead' : null
      },
      isTypeAhead() {
        return this.type === 'type-ahead'
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
      if (this.grouped) {
        this.provideProp('dropdown-groups', this.dropdownGroups, 'type', this.type)
        this.provideProp('dropdown-groups', this.dropdownGroups, 'name', this.name)

        return
      }

      this.provideProp('dropdown-items', this.dropdownItems, 'type', this.type)
      this.provideProp('dropdown-items', this.dropdownItems, 'name', this.name)
    },
  }
</script>
