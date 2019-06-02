<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" :to="{name: 'SURATES'}">
            Wikislam
          </router-link>
        </div>
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
    background: white;
    padding: 9px 0;
    -webkit-box-shadow: 1px -7px 9px 6px rgba(0,0,0,0.45);
    -moz-box-shadow: 1px -7px 9px 6px rgba(0,0,0,0.45);
    box-shadow: 1px -7px 9px 6px rgba(0,0,0,0.45);


    .navbar{
      background: transparent;

      .navbar-brand {
        .navbar-item {
          font-size: 1.3rem;
          color: black;
        }
      }
    }
  }
</style>
