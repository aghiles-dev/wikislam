import { SurateState } from './SurateState'

export interface SuratesListState {
  surates: SurateState[]
  isLoading: boolean
  isError: boolean
}
