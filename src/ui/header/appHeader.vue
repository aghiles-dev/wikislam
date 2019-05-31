<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'HOME'}">
          Wikislam
        </router-link>
      </div>

    </nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
  header {
    height: $header-height;

    .navbar {
      background: aqua;
    }
  }
</style>
