import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'redux-vue'
import { getAllSurates, getCurrentSurate, isSuratesListBeingFetched } from '../../../config/store/rootSelectors'
import { Wording, WordingConstants } from '../../../app/shared/wordingConstants'
import { AppState } from '../../../config/store/rootState'
import AppSurates from './AppSurate.vue'
import { surateActions } from '../../../app/surate/usecases/surate.actions'
import { AppRouter } from '../../../config/router/router'
import { Verse } from '../../../app/surate/domain/Verse'
import { SurateState } from '../../../app/surates-list/domain/SurateState'

export type AppSurateProps = {
  surateId: number
  surateDetails?: SurateState
  verses: Verse[]
  isLoading: boolean
  wording: Wording
}

export type AppSurateActions = {
  fetchSurateById: (surateId: number) => void
  resetCurrentSurate: () => void
}

const mapStateToProps = (state: AppState): { state: AppSurateProps } => ({
  state: {
    surateId: +AppRouter.currentRoute.params.surateId,
    surateDetails: getAllSurates(state).find(surate => surate.id === +AppRouter.currentRoute.params.surateId),
    verses: getCurrentSurate(state).verses,
    isLoading: getCurrentSurate(state).isLoading,
    wording: WordingConstants
  }
})

const mapDispatchToProps = (dispatch: Dispatch): { actions: AppSurateActions } => ({
  actions: bindActionCreators(
    {
      fetchSurateById: surateActions.fetchSurateById,
      resetCurrentSurate: surateActions.resetCurrentSurate
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSurates)
