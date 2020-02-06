<template>
  <li v-if="subitems">
    <span
      class="raul-left-navigation-item has-subitems"
      :class="[isActive, hasCounts, classes, colorClass]"
      v-bind="attributes"
    >
      <ui-icon
        icon="omnibar-angle-down"
        class="raul-left-navigation-item-arrow"
        :class="arrowUp"
      ></ui-icon>

      <i
        class="raul-left-navigation-item-icon"
        :class="[icon, colorClass]"
        :data-counts="counts"
        v-if="isFaIcon"
      ></i>

      <ui-icon
        class="raul-left-navigation-item-icon"
        :class="colorClass"
        :icon="icon"
        :data-counts="counts"
        v-else
      ></ui-icon>

      <span class="raul-left-navigation-item-display">{{ text }}</span>
    </span>

    <ul
      class="raul-left-navigation-subitems"
      :class="isOpen"
    >
      <slot></slot>
      <slot-template></slot-template>
    </ul>
  </li>

  <li v-else>
    <a
      class="raul-left-navigation-item no-subitems"
      :class="[isActive, hasCounts, classes, colorClass]"
      v-bind="attributes"
      :href="url"
    >
      <i
        class="raul-left-navigation-item-icon"
        :class="[icon, colorClass]"
        :data-counts="counts"
        v-if="isFaIcon"
      ></i>

      <ui-icon
        class="raul-left-navigation-item-icon"
        :class="colorClass"
        :icon="icon"
        :data-counts="counts"
        v-else
      ></ui-icon>

      <span class="raul-left-navigation-item-display">{{ text }}</span>
    </a>
  </li>
</template>

<script>
  export default {
    props: {
      active: Boolean,
      attributes: Object,
      classes: [String, Array],
      colorClass: String,
      counts: String,
      icon: String,
      url: String,
      subitems: Boolean,
      text: String,
    },

    computed: {
      arrowUp() {
        return this.active ? 'arrow-up' : null
      },
      isActive() {
        return this.active ? 'selected active' : null
      },
      isOpen() {
        return this.active ? 'subitems-open' : null
      },
      hasCounts() {
        return !!this.counts ? 'raul-left-navigation-item-counts' : null
      },
      isFaIcon() {
        return /^(fa)\s(fa)/.test(this.icon)
      },
    },
  }
</script>
