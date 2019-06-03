<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small is-primary" max="100"/>

    <div v-else>
      {{state.verses.length}}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { AppSurateActions, AppSurateProps } from "./AppSurateConnected"

  @Component({})
  export default class AppSurates extends Vue {
    @Prop() state: AppSurateProps
    @Prop() actions: AppSurateActions

    mounted () {
      this.actions.fetchSurateById(this.state.surateId)
    }
  }
</script>

<style lang="scss" scoped>

</style>
