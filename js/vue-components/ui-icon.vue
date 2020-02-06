<template>
  <i v-html="iconSVG"></i>
</template>

<script>
  import slots from '../vue-mixins/slots.mixin'

  const kindDirectory = {
    family: 'families',
    icon: 'icons',
    product: 'products',
    resource: 'resources'
  }

  const fetchSVG = (vm, icon, kind) => {
    const iconStore = vm.$store.state.icons
    if (!icon) return false
    if (iconStore[icon]) return (vm.iconSVG = iconStore[icon])

    fetch(`//cdn.realpage.com/images/${kindDirectory[kind]}/${icon}.svg`)
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        throw new Error('Network response was not ok.')
      })
      .then(text => {
        vm.iconSVG = iconStore[icon] = text
      })
      .catch(err => console.log(err))
  }

  export default {
    mixins: [slots],

    data() {
      return {
        iconSVG: '',
      }
    },

    props: {
      icon: String,

      kind: {
        default: 'icon',
        type: String,
      },
    },

    created() {
      fetchSVG(this, this.icon, this.kind)
    },

    watch: {
      icon: function(icon) {
        fetchSVG(this, icon, this.kind)
      },

      kind: function(kind) {
        fetchSVG(this, this.icon, kind)
      },
    }
  }
</script>
