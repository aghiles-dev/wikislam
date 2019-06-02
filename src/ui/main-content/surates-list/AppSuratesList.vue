<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small is-primary" max="100"/>

    <div v-else>
      <div v-for="surate in state.surates"
           :key="surate.id"
           class="card">
        <span>{{surate.id}}</span><br>
        <span>{{surate.beginsWithBismillah}}</span><br>
        <span>{{surate.surateNumber}}</span><br>
        <span>{{surate.arabicName}}</span><br>
        <span>{{surate.frenchName}}</span><br>
        <span>{{surate.name}}</span><br>
        <span>{{surate.numberOfVerses}}</span><br>
        <span>{{surate.revelationOrder}}</span><br>
        <span>{{surate.revelationPlace}}</span><br>

      </div>
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
