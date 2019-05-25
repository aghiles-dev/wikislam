import { ActionsObservable, combineEpics, ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AppState } from '../../../config/store/rootState'
import { FETCH_SURATES_LIST, suratesListActions, suratesListActionTypes } from './suratesList.actions'
import { SuratesListRepository } from '../domain/ports/SuratesListRepository'

type Dependencies = { suratesListRepository: SuratesListRepository }

function fetchAuthenticatedUserEpic(action$: ActionsObservable<suratesListActionTypes>,
                                    state$: StateObservable<AppState>,
                                    { suratesListRepository }: Dependencies): Observable<suratesListActionTypes> {
  return action$.pipe(
    ofType(FETCH_SURATES_LIST),
    switchMap(() => suratesListRepository.fetchAllSurates().pipe(
      map(suratesList => suratesListActions.suratesListFetched(suratesList)),
      catchError(() => of(suratesListActions.suratesListErrorInFetching()))
    ))
  )
}

export const suratesListEpics = combineEpics<suratesListActionTypes, suratesListActionTypes, AppState>(
  fetchAuthenticatedUserEpic
)
