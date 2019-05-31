<template>
  <div>
    <nav-bar/>

    <section>
      <main class="content">
        <router-view/>
      </main>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import NavBar from './nav-bar/navBar.vue';

  @Component({
    components: { NavBar }
  })
  export default class App extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>
