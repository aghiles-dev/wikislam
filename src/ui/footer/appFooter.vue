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
    display: flex;
    align-items: center;
    height: $footer-height;
    background: #1b005e;
    color: white;
  }
</style>
