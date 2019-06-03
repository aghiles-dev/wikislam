<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small is-primary" max="100"/>

    <div v-else>
      <div class="columns is-centered"
           v-for="surate in state.surates"
           :key="surate.id">
        <div class="column card is-10-mobile is-8-tablet">
          <p class="is-size-4 has-text-centered is-spaced has-cursor-pointer">
            <span>{{surate.surateNumber}}. {{surate.name}} ({{surate.numberOfVerses}})({{surate.arabicName}})</span><br>
            <span class="is-size-5">{{surate.frenchName}}</span>
          </p>
        </div>
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
