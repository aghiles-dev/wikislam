<template>
  <div>
    <progress v-if="state.isLoading" class="progress is-small" max="100"/>

    <div v-else>
      <div class="language-choice">
        <div class="select">
          <select id="language-choice-select" v-model="languageChoice">
            <option :value="state.wording.FRANCAIS">{{state.wording.FRANCAIS}}</option>
            <option :value="state.wording.ARABE">{{state.wording.ARABE}}</option>
            <option :value="state.wording.ARABE_FRANCAIS">{{state.wording.ARABE_FRANCAIS}}</option>
          </select>
        </div>
      </div>

      <div class="card"
           v-for="verse in state.verses"
           :key="verse.id">
        <div class="card-content">
          <p class="is-size-6" v-if="isFrenchVisible">
            <span>{{verse.verseNumber}}. {{verse.frenchText}}</span>
          </p>

          <p class="is-size-4 has-text-right arabic-text has-text-dark" v-if="isArabicVisible">
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

    languageChoice: string = this.state.wording.FRANCAIS

    get isFrenchVisible(): boolean {
      return [this.state.wording.FRANCAIS, this.state.wording.ARABE_FRANCAIS].includes(this.languageChoice)
    }

    get isArabicVisible(): boolean {
      return [this.state.wording.ARABE, this.state.wording.ARABE_FRANCAIS].includes(this.languageChoice)
    }

    mounted () {
      this.actions.fetchSurateById(this.state.surateId)
      this.actions.fetchAllSurates()
    }

    beforeDestroy () {
      this.actions.resetCurrentSurate()
    }
  }
</script>

<style lang="scss" scoped>
  .language-choice {
    margin-bottom: 30px;
  }

  .arabic-text {
    direction: rtl;

    > .verse-number {
      position: relative;
      bottom: 4px;
    }
  }
</style>
