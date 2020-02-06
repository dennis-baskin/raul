<template>
  <div>
    <div class="form-group">
      <label>Find Icons</label>
      <div class="form-control-wrapper">
        <input
            type="search"
            name="icon-search"
            class="form-control"
            placeholder="Search Icons..."
            v-model="searchIconsText"
        />
        <div class="form-icon-box">
          <i class="fa fa-search form-icon form-icon-search form-icon-grey" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <p v-if="searchDetailsText.length" v-text="searchDetailsText"></p>

    <div
      class="icon-list d-flex flex-wrap"
      ref="icons-list"
    ></div>

    <div class="row justify-content-center mt-3">
      <div class="col-sm-6 col-lg-3">
        <button
          class="button button-primary button-outline button-block"
          v-if="loadMoreButtonActiveStatus"
          @click="getNextLoad"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { allIcons } from './icons-list'
  import GetIcons from'./get-icons.vue'

  export default {
    components: { GetIcons },

    data: function () {
      return {
        allIcons: allIcons,
        filteredIcons: {
          iconsPerLoad: 100,
          loadNumber: 0,
          icons: [],
        },
        timeoutId: 0,
        searchIconsText: '',
        searchDetailsText: '',
      }
    },

    methods: {
      updateDetailsText() {
        if (!this.searchIconsText.length) return this.searchDetailsText = ''

        this.searchDetailsText = this.currentIconsLimit ?
          `${this.currentIconsLimit} icons available for "${this.searchIconsText}"` :
          'Your search didn\'t return any results'
      },

      searchByName(name) {
        const newList = () => {
          this.removeItems()
          this.resetAvailableItemsByName(name)
          this.loadItems()
        }

        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(newList, 1000)
      },

      currentLoadsItems() {
        const fromIndex = this.filteredIcons.loadNumber * this.filteredIcons.iconsPerLoad
        const toIndex = !this.loadMoreButtonActiveStatus ? this.currentIconsLimit : this.maxSuperiorIndex

        const currentIcons = []
        for (let i = fromIndex; i < toIndex; i++) currentIcons.push(this.filteredIcons.icons[i])

        return currentIcons
      },

      loadItems() {
        const iconsComponent = Vue.extend(GetIcons)
        const list = new iconsComponent({
          propsData: { icons: this.currentLoadsItems() }
        })
        list.$mount()

        const iconListElement = this.$refs['icons-list']
        const iconElements = list.$el.childNodes

        while(iconElements.length) iconListElement.appendChild(iconElements[0])
        this.updateDetailsText()
      },

      removeItems() {
        this.$refs['icons-list'].innerHTML = ''
      },

      resetAvailableItemsByName(name) {
        this.filteredIcons.icons = this.allIcons.filter(icon => icon.includes(name))
        this.filteredIcons.loadNumber = 0
      },

      getNextLoad(e) {
        e.preventDefault()
        if (!this.loadMoreButtonActiveStatus) return

        this.filteredIcons.loadNumber++
        this.loadItems()
      }
    },

    watch: {
      searchIconsText: function (val, oldVal) {
        this.searchByName(val)
      },
    },

    computed: {
      loadMoreButtonActiveStatus() {
        return this.currentIconsLimit > this.maxSuperiorIndex
      },

      maxSuperiorIndex() {
        return (this.filteredIcons.loadNumber + 1) * this.filteredIcons.iconsPerLoad
      },

      currentIconsLimit() {
        return this.filteredIcons.icons.length
      },
    },

    mounted: function() {
      this.resetAvailableItemsByName(name)
      this.loadItems()
    },
  }
</script>
