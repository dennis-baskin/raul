<template>
  <header id="raul-page-header" class="raul-page-header" :class="pageHeaderClass">
    <h2 id="raul-page-header-page" class="raul-page-header-page">
      {{page}}
    </h2>

    <div id="raul-page-header-breadcrumbs" class="raul-page-header-breadcrumbs">
      <div
        id="raul-page-header-breadcrumbs-dropdown"
        class="raul-page-header-breadcrumbs-dropdown d-md-none"
      >
        <a class="raul-page-header-breadcrumbs-dropdown-breadcrumb" :href="domainLink">
          {{domain}}
        </a>

        <a class="raul-page-header-breadcrumbs-dropdown-breadcrumb" :href="pageLink">
          {{page}}
        </a>

        <a
          class="raul-page-header-breadcrumbs-dropdown-breadcrumb"
          :href="subPageLink"
          v-if="subpage"
        >
          {{subpage}}
        </a>
      </div>

      <ui-icon
        icon="omnibar-angle-left"
        id="raul-page-header-breadcrumbs-back"
        class="d-inline-block d-md-none"
      ></ui-icon>

      <a class="raul-page-header-breadcrumb hidden-sm-down" :href="domainLink">
         {{domain}}
      </a>

      <span class="hidden-sm-down"> / </span>

      <a class="raul-page-header-breadcrumb hidden-sm-down" :href="pageLink">
        {{page}}
      </a>

      <span class="hidden-sm-down" v-if="subpage"> / </span>

      <a class="raul-page-header-breadcrumb hidden-sm-down" :href="subPageLink" v-if="subpage">
        {{subpage}}
      </a>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      domain: String,
      domainLink: String,
      page: String,
      pageLink: String,
      subpage: String,
      subpageLink: String,

      hideLeftNav: Boolean,
    },

    mounted() {
      // Temporaraly disables animation for initial state load
      // workaround to support old nav toggling until nav is included in vue components
      ;[
        document.querySelector('.raul-page-header'),
      ].forEach((element) => {
        if (!element) return

        element.classList.add('no-transition')
        setTimeout(() => element.classList.remove('no-transition'), 300)
      })
    },

    computed: {
      pageHeaderClass() {
        return this.hideLeftNav ? 'hide-left-nav' : null
      }
    },
  }
</script>
