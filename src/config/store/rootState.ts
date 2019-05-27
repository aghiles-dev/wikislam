import { SuratesListState } from '../../app/surates-list/domain/SuratesListState'
import { SurateContentState } from '../../app/surate/domain/SurateContentState'

export interface AppState {
  suratesList: SuratesListState,
  currentSurate: SurateContentState
}
