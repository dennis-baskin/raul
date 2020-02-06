<template>
  <ui-unified-navbar-item
    href="#switcher"
    :custom-icon="false"
    classes="raul-header-app-switcher"
    icon="omnibar-switcher"
    @click="toggleOpen"
    show-for-all-media-sizes
  >
    <transition name="fade">
      <div v-if="opened" v-click-outside="hide" class="raul-switcher-context">
        <ul class="raul-nav nav nav-tabs raul-nav-underline" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#apps-all"
              aria-controls="apps-all"
              role="tab"
              data-toggle="tab"
              :class="activeTab === 1 ? 'active' : null"
              :aria-expanded="activeTab === 1"
              @click="activeTab = 1"
            >
              All Products
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#apps-favorites"
              aria-controls="apps-favorites"
              role="tab"
              data-toggle="tab"
              :class="activeTab === 2 ? 'active' : null"
              :aria-expanded="activeTab === 2"
              @click="activeTab = 2"
            >
              Favorites
            </a>
          </li>
        </ul>

        <div class="raul-tab-content tab-content">
          <div
            role="tabpanel"
            class="tab-pane"
            id="apps-all"
            :class="activeTab === 1 ? 'active show' : null"
            v-show="activeTab === 1"
          >
            <div class="family mb-2" v-for="(family, familyName) in familyProducts">
              <h3 :class="familyClass(familyName)">
                <i class="family-icon"></i>
                <span class="family-text">{{familyName}}</span>
              </h3>

              <div class="products">
                <a
                  class="product-url"
                  v-for="product in family"
                  :href="product.url"
                  :target="newTab(product)"
                >
                  <span class="mr-2 mb-2" :class="productClass(product)">
                    <i class="product-icon"></i>
                    <span class="product-name">{{productName(product)}}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            role="tabpanel"
            class="tab-pane"
            id="apps-favorites"
            :class="activeTab === 2 ? 'active show' : null"
            v-show="activeTab === 2"
          >
            <div class="products">
              <a
                class="product-url"
                v-for="product in favoriteProducts"
                :href="product.url"
                :target="newTab(product)"
              >
                <span class="mr-2 mb-2" :class="productClass(product)">
                  <i class="product-icon"></i>
                  <span class="product-name">{{productName(product)}}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </ui-unified-navbar-item>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UiUnifiedNavbarItem from './ui-unified-navbar-item.vue'

  export default {
    data() {
      return {
        opened: false,
        activeTab: 1,
      }
    },

    components: {
      UiUnifiedNavbarItem,
    },

    computed: {
      ...mapGetters([
        'familyProducts',
        'favoriteProducts'
      ]),
    },

    methods: {
      familyClass(familyName) {
        const familyNameClass = familyName.toLowerCase().replace(/\s/g, '-').replace('&', 'and')
        return `${familyNameClass} p-0 family-name`
      },

      hide() {
        this.opened = false
      },

      newTab({isNewTab, label}) {
        return isNewTab ? label : '_self'
      },

      productClass({label}) {
        return `product m-0 ${label}`
      },

      productName({name}) {
        return name.length > 32 ? `${name.substring(0, 32)}...` : name
      },

      toggleOpen(event) {
        event.preventDefault()
        this.opened = !this.opened
      },
    },
  }
</script>

<style scoped>
  .raul-switcher-context {
    right: -30px;
    top: 56px;
  }

  .product-url {
    width: 25%;
  }
</style>
