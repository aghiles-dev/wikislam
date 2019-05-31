import { createAction } from '../../../config/store/helpers/createAction'
import { ActionsUnion } from '../../../config/store/helpers/actionsUnion'
import { Verse } from '../domain/Verse'

export const FETCH_SURATE_BY_ID = 'FETCH_SURATE_BY_ID'
export const SURATE_FETCHED = 'SURATE_FETCHED'
export const SURATE_FETCHING_ON_ERROR = 'SURATE_FETCHING_ON_ERROR'

export const surateActions = {
  fetchSurateById: (surateId: number) => createAction(FETCH_SURATE_BY_ID, surateId),
  surateFetched: (verses: Verse[]) => createAction(SURATE_FETCHED, verses),
  surateFetchingOnError: () => createAction(SURATE_FETCHING_ON_ERROR)
}

export type surateActionTypes = ActionsUnion<typeof surateActions>
