import { SurateContentState } from '../domain/SurateContentState'
import {
  FETCH_SURATE_BY_ID,
  RESET_CURRENT_SURATE,
  SURATE_FETCHED,
  SURATE_FETCHING_ON_ERROR,
  surateActionTypes
} from './surate.actions'

const initialSurateContentState: SurateContentState = {
  verses: [],
  isLoading: false
}

function handleSurate (state: SurateContentState = initialSurateContentState,
                       action: surateActionTypes): SurateContentState {
  switch (action.type) {
    case FETCH_SURATE_BY_ID:
      return {
        ...state,
        isLoading: true
      }
    case SURATE_FETCHED:
      return {
        ...state,
        verses: action.payload,
        isLoading: false
      }
    case SURATE_FETCHING_ON_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case RESET_CURRENT_SURATE:
      return { ...initialSurateContentState }
    default:
      return state
  }
}

export default handleSurate

export function _getCurrentSurate (surateContent: SurateContentState): SurateContentState {
  return surateContent
}
