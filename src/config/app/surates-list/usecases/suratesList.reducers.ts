import { SuratesListState } from '../domain/SuratesListState'
import {
  FETCH_SURATES_LIST,
  SURATES_LIST_ERROR_IN_FETCHING,
  SURATES_LIST_FETCHED,
  suratesListActionTypes
} from './suratesList.actions'
import { SurateState } from '../../surate/domain/SurateState'

const initialSuratesListState: SuratesListState = {
  surates: [],
  isLoading: false
}

function handleSuratesList(state: SuratesListState = initialSuratesListState,
                           action: suratesListActionTypes): SuratesListState {
  switch (action.type) {
    case FETCH_SURATES_LIST:
      return {
        ...state,
        isLoading: true
      }
    case SURATES_LIST_FETCHED:
      return {
        ...state,
        surates: action.payload
      }
    case SURATES_LIST_ERROR_IN_FETCHING:
      return {
        ...state
      }
    default:
      return state
  }
}

export default handleSuratesList

export function _getAllSurates(surateList: SuratesListState): SurateState[] {
  return surateList.surates
}

export function _isSuratesListBeingFetched(surateList: SuratesListState): Boolean {
  return surateList.isLoading
}
