<template>
  <nav class="raul-left-navigation" :class="theme" v-click-outside="close">
    <ul
      id="raul-left-navigation-items"
      class="raul-left-navigation-items"
      v-if="items.length > 0"
    >
      <ui-left-nav-item
        v-for="(item, index) in items"
        :attributes="item.attributes"
        :classes="item.classes"
        :color-class="item.colorClass"
        :counts="item.counts"
        :icon="item.icon"
        :text="item.title"
        :url="item.url"
        :active="item.active"
        :subitems="!!item.items"
        :key="index"
      >
        <ui-left-nav-subitem
          v-for="(subItem, index) in item.items"
          :attributes="subItem.attributes"
          :classes="subItem.classes"
          :color-class="subItem.colorClass"
          :counts="subItem.counts"
          :icon="subItem.icon"
          :text="subItem.title"
          :url="subItem.url"
          :active="subItem.active"
          :subitems="!!subItem.items"
          :key="index"
        >
          <ui-left-nav-subitem
            v-for="(subItemLevel2, index) in subItem.items"
            :attributes="subItemLevel2.attributes"
            :classes="subItemLevel2.classes"
            :color-class="subItemLevel2.colorClass"
            :counts="subItemLevel2.counts"
            :icon="subItemLevel2.icon"
            :text="subItemLevel2.title"
            :url="subItemLevel2.url"
            :active="subItemLevel2.active"
            :subitems="!!subItemLevel2.items"
            :key="index"
          >
            <ui-left-nav-subitem
              v-for="(subItemLevel3, index) in subItemLevel2.items"
              :attributes="subItemLevel3.attributes"
              :classes="subItemLevel3.classes"
              :color-class="subItemLevel3.colorClass"
              :counts="subItemLevel3.counts"
              :icon="subItemLevel3.icon"
              :text="subItemLevel3.title"
              :url="subItemLevel3.url"
              :active="subItemLevel3.active"
              :subitems="!!subItemLevel3.items"
              :key="index"
            >
              <ui-left-nav-subitem
                v-for="(subItemLevel4, index) in subItemLevel3.items"
                :attributes="subItemLevel4.attributes"
                :classes="subItemLevel4.classes"
                :color-class="subItemLevel4.colorClass"
                :counts="subItemLevel4.counts"
                :icon="subItemLevel4.icon"
                :text="subItemLevel4.title"
                :url="subItemLevel4.url"
                :active="subItemLevel4.active"
                :subitems="!!subItemLevel4.items"
                :key="index"
              >
                <ui-left-nav-subitem
                  v-for="(subItemLevel5, index) in subItemLevel4.items"
                  :attributes="subItemLevel5.attattributes"
                  :classes="subItemLevel5.classes"
                  :color-class="subItemLevel5.colorClass"
                  :counts="subItemLevel5.counts"
                  :icon="subItemLevel5.icon"
                  :text="subItemLevel5.title"
                  :url="subItemLevel5.url"
                  :active="subItemLevel5.active"
                  :subitems="!!subItemLevel5.items"
                  :key="index"
                >
                </ui-left-nav-subitem>
              </ui-left-nav-subitem>
            </ui-left-nav-subitem>
          </ui-left-nav-subitem>
        </ui-left-nav-subitem>
      </ui-left-nav-item>
    </ul>

    <template v-else>
      <slot></slot>
      <slot-template v-refs:slots></slot-template>
    </template>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  import { Api } from '../vue-mixins/api.mixin'
  import slots from '../vue-mixins/slots.mixin'

  import UiLeftNavItem from './ui-left-nav-item.vue'
  import UiLeftNavSubitem from './ui-left-nav-subitem.vue'

  const api = Api({
    items: {
      get() {
        return this.items
      },

      set(items) {
        return this.items = items
      },
    },
  })

  export default {
    mixins: [api, slots],

    components: {
      UiLeftNavItem,
      UiLeftNavSubitem,
    },

    data() {
      return {
        items: [],
      }
    },

    props: {
      dataDriven: Boolean,
    },

    computed: {
      ...mapGetters([
        'leftNavTheme',
      ]),

      theme() {
        return `raul-left-navigation-${this.leftNavTheme}`
      },
    },

    methods: {
      close(event) {
        if (
          event.target.classList.contains('raul-header-menu-button') ||
          event.target.closest('.raul-header-menu-button')
        ) return
        document.body.classList.remove('raul-left-navigation-mobile-open')
        this.$store.dispatch('collapseLeftNav')
      },
    },

    beforeMount() {
      this.$store.dispatch('initializeLeftNavExpanded')
    },
  }
</script>
