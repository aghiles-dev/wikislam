import { AppState } from './rootState'
import { SurateState } from '../../app/surate/domain/SurateState'
import {
  _getAllSurates,
  _isSuratesListBeingFetched,
  _isSuratesListFetchingInError
} from '../../app/surates-list/usecases/suratesList.reducers'
import { SurateContentState } from '../../app/surate/domain/SurateContentState'
import { _getCurrentSurate } from '../../app/surate/usecases/surate.reducers'

export function getAllSurates(state: AppState): SurateState[] {
  return _getAllSurates(state.suratesList)
}

export function isSuratesListBeingFetched(state: AppState): Boolean {
  return _isSuratesListBeingFetched(state.suratesList)
}

export function isSuratesListFetchingInError(state: AppState): Boolean {
  return _isSuratesListFetchingInError(state.suratesList)
}

export function getCurrentSurate(state: AppState): SurateContentState {
  return _getCurrentSurate(state.currentSurate)
}
