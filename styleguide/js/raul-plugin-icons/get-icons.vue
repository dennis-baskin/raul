<template>
  <div v-if="icons.length > 0">
    <div class="ui-icon" v-for="icon in icons" :key="icon">
      <ui-icon :icon="icon"></ui-icon>
      <code class="icon-code">{{icon}}</code>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icons: Array,
    },
  }
</script>
