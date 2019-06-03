<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small is-primary" max="100"/>

    <div v-else>
      <div class="columns is-centered">
        <div class="column is-10-mobile is-8-tablet checkboxes">
          <label class="checkbox">
            <input type="checkbox" v-model="isFrenchTextVisible">
            {{state.wording.MONTRER_TEXT_FRANCAIS}}
          </label>
          <label class="checkbox">
            <input type="checkbox" v-model="isArabicTextVisible">
            {{state.wording.MONTRER_TEXT_ARABE}}
          </label>
        </div>
      </div>

      <div class="columns is-centered"
           v-for="verse in state.verses"
           :key="verse.id">
        <div class="column card is-10-mobile is-8-tablet">
          <p class="is-size-6" v-if="isFrenchTextVisible">
            <span>{{verse.verseNumber}}. {{verse.frenchText}}</span>
          </p>

          <p class="is-size-4 has-text-right arabic-text" v-if="isArabicTextVisible">
            <span class="is-size-5 verse-number">{{verse.verseNumber}}.</span> <span>{{verse.arabicText}}</span>
          </p>
        </div>
      </div>
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

    isArabicTextVisible: boolean = false
    isFrenchTextVisible: boolean = true

    mounted () {
      this.actions.fetchSurateById(this.state.surateId)
    }

    beforeDestroy () {
      this.actions.resetCurrentSurate()
    }
  }
</script>

<style lang="scss" scoped>
  .checkboxes {
    display: flex;
    justify-content: space-around;
  }
  .arabic-text {
    direction: rtl;

    > .verse-number {
      position: relative;
      bottom: 4px;
    }
  }
</style>
