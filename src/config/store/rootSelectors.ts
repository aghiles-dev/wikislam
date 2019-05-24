import { AppState } from './rootState'
import { SurateState } from '../app/surate/domain/SurateState'
import { _getAllSurates, _isSuratesListBeingFetched } from '../app/surates-list/usecases/suratesList.reducers'

export function getAllSurates(state: AppState): SurateState[] {
  return _getAllSurates(state.suratesList)
}

export function isSuratesListBeingFetched(state: AppState): Boolean {
  return _isSuratesListBeingFetched(state.suratesList)
}
