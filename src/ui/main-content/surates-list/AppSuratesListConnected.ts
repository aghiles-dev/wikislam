import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'redux-vue'
import { SurateState } from '../../../app/surate/domain/SurateState'
import {
  getAllSurates,
  isSuratesListBeingFetched,
  isSuratesListFetchingInError
} from '../../../config/store/rootSelectors'
import { Wording, WordingConstants } from '../../../app/shared/wordingConstants'
import { AppState } from '../../../config/store/rootState'
import { suratesListActions } from '../../../app/surates-list/usecases/suratesList.actions'
import AppSuratesList from './AppSuratesList.vue'

export type AppSuratesListProps = {
  surates: SurateState[]
  isLoading: boolean
  isError: boolean
  wording: Wording
}

export type AppSuratesListActions = {
  fetchSuratesList: () => void
}

const mapStateToProps = (state: AppState): { state: AppSuratesListProps } => ({
  state: {
    surates: getAllSurates(state),
    isLoading: isSuratesListBeingFetched(state),
    isError: isSuratesListFetchingInError(state),
    wording: WordingConstants
  }
})

const mapDispatchToProps = (dispatch: Dispatch): { actions: AppSuratesListActions } => ({
  actions: bindActionCreators(
    {
      fetchSuratesList: suratesListActions.fetchSuratesList
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSuratesList)
