<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small is-primary" max="100"/>

    <div v-else>
      {{state.surates.length}}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { AppSuratesListActions, AppSuratesListProps } from './AppSuratesListConnected'

  @Component({})
  export default class AppSuratesList extends Vue {
    @Prop() state: AppSuratesListProps
    @Prop() actions: AppSuratesListActions

    mounted () {
      this.actions.fetchSuratesList()
    }
  }
</script>

<style lang="scss" scoped>

</style>
