import { ActionsObservable, combineEpics, ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { AppState } from '../../../config/store/rootState'
import { SurateRepository } from '../domain/ports/SurateRepository'
import { FETCH_SURATE_BY_ID, surateActions, surateActionTypes } from './surate.actions'

type Dependencies = { surateRepository: SurateRepository }

function fetchAuthenticatedUserEpic(action$: ActionsObservable<surateActionTypes>,
                                    state$: StateObservable<AppState>,
                                    { surateRepository }: Dependencies): Observable<surateActionTypes> {
  return action$.pipe(
    ofType(FETCH_SURATE_BY_ID),
    switchMap((action) => surateRepository.fetchById((action as {payload: number}).payload).pipe(
      map(surateContent => surateActions.surateFetched(surateContent)),
      catchError(() => of(surateActions.surateFetchingOnError()))
    ))
  )
}

export const surateEpics = combineEpics<surateActionTypes, surateActionTypes, AppState>(
  fetchAuthenticatedUserEpic
)
