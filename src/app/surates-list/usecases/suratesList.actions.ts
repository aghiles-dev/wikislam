import { createAction } from '../../../config/store/helpers/createAction'
import { ActionsUnion } from '../../../config/store/helpers/actionsUnion'
import { SurateState } from '../domain/SurateState'

export const FETCH_SURATES_LIST = 'FETCH_SURATES_LIST'
export const SURATES_LIST_FETCHED = 'SURATES_LIST_FETCHED'
export const SURATES_LIST_ERROR_IN_FETCHING = 'SURATES_LIST_ERROR_IN_FETCHING'

export const suratesListActions = {
  fetchSuratesList: () => createAction(FETCH_SURATES_LIST),
  suratesListFetched: (suratesList: SurateState[]) => createAction(SURATES_LIST_FETCHED, suratesList),
  suratesListErrorInFetching: () => createAction(SURATES_LIST_ERROR_IN_FETCHING),
}

export type suratesListActionTypes = ActionsUnion<typeof suratesListActions>
