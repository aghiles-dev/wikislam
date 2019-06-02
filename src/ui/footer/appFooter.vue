<template>
  <footer>
    <div class="container">
      footer
    </div>
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
    background: #cccfd1;
    color: black;
    border-top: 1px solid #bfc2c4;
  }
</style>
