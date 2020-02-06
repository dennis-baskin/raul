<template>
  <div>
    <div class="raul-header-search d-none d-lg-block">
      <input
        class="raul-header-search-input"
        placeholder="Search"
        v-model="search"
        @blur="searchEvent($event, 'blur')"
        @change="searchEvent($event, 'change')"
        @focus="searchEvent($event, 'focus')"
        @keydown="searchEvent($event, 'keydown')"
        @keyup.enter="searchEvent($event, 'submit')"
        @keyup="searchEvent($event, 'keyup')"
      />

      <ui-icon
        icon="omnibar-search"
        class="raul-header-search-icon"
        @click="searchEvent($event, 'submit')"
      ></ui-icon>
    </div>

    <div class="raul-header-search-mobile d-lg-none" v-click-outside="closeMobileSearch">
      <input
        class="raul-header-search-input-mobile"
        placeholder="Search"
        :class="{expanded: mobileSearchOpen}"
        v-model="search"
        @blur="searchEvent($event, 'blur')"
        @change="searchEvent($event, 'change')"
        @focus="searchEvent($event, 'focus')"
        @keydown="searchEvent($event, 'keydown')"
        @keyup.enter="searchEvent($event, 'submit')"
        @keyup="searchEvent($event, 'keyup')"
      />

      <transition name="fade">
        <ui-icon
          icon="omnibar-search"
          class="raul-header-search-icon-mobile"
          v-if="!isMobileSearchExpanded"
          @click="openMobileSearch"
        ></ui-icon>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        mobileSearchOpen: false,
        search: '',
      }
    },

    computed: {
      ...mapGetters([
        'isMobileSearchExpanded',
      ]),
    },

    methods: {
      ...mapActions([
        'callSearchEventHandler',
        'collapseMobileSearch',
        'expandMobileSearch',
      ]),

      closeMobileSearch() {
        this.mobileSearchOpen = false
        setTimeout(() => this.collapseMobileSearch(), 350)
      },

      openMobileSearch() {
        this.expandMobileSearch()
        setTimeout(() => { this.mobileSearchOpen = true }, 350)
      },

      submitMobileSearch() {
        const input = this.$refs['mobile-search']
        this.onSearchSubmit(input, input.value)
      },

      searchEvent(event, type) {
        this.callSearchEventHandler({
          type: type,
          event: event,
          data: this.search,
        })
      },
    }
  }
</script>

<style scoped>
  .raul-header-search-input-mobile.expanded {
    padding-left: 1rem;
    width: 100%;
  }
</style>
