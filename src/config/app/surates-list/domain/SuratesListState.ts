import { SurateState } from '../../surate/domain/SurateState'

export interface SuratesListState {
  surates: SurateState[]
  isLoading: boolean
}