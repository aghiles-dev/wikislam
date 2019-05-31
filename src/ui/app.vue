<template>
  <div>
    <app-header/>
    <section>
      <main class="content">
        <div class="columns">
          <div class="column is-10-tablet is-offset-1-tablet">
            <router-view/>
          </div>
        </div>
      </main>
    </section>

    <app-footer/>
  </div>
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
  }
</style>
