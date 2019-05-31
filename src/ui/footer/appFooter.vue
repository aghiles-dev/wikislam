<template>
  <footer>
    footer
  </footer>
</template>

<script lang="ts">
  import Vue from "vue"
  import { Component } from "vue-property-decorator"

  @Component({})
  export default class AppFooter extends Vue {
  }
</script>

<style lang="scss" scoped>
  footer {
    height: $footer-height;
    background: aquamarine;
  }
</style>
