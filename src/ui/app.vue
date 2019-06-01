<template>
  <section>
    <app-header/>

    <main class="content">
      <section class="columns">
        <div class="column is-10-tablet is-offset-1-tablet">
          <router-view/>
        </div>
      </section>
    </main>

    <app-footer/>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import AppHeader from './header/appHeader.vue'
  import AppFooter from './footer/appFooter.vue';

  @Component({
    components: { AppFooter, AppHeader }
  })
  export default class App extends Vue {

  }
</script>

<style lang="scss" scoped>
  .content {
    min-height: calc(100vh - #{$header-height} - #{$footer-height});
    margin: 0;
  }
</style>
