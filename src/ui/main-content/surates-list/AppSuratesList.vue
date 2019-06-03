<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small" max="100"/>

    <div v-else>
      <div class="card"
           v-for="surate in state.surates"
           :key="surate.id">
        <div class="card-content">
          <p class="is-size-4 has-text-centered has-cursor-pointer"
             @click="goToSurate(surate.id)">
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
  import { AppRouteName } from '../../../config/router/AppRouteNames';

  @Component({})
  export default class AppSuratesList extends Vue {
    @Prop() state: AppSuratesListProps
    @Prop() actions: AppSuratesListActions

    mounted () {
      this.actions.fetchSuratesList()
    }

    goToSurate (surateId) {
      this.$router.push({ name: AppRouteName.SURATE_DETAILS, params: { surateId } })
    }
  }
</script>

<style lang="scss" scoped>

</style>
