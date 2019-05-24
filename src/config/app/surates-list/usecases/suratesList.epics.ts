import { ActionsObservable, combineEpics, ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AppState } from '../../../store/rootState'
import { FETCH_SURATES_LIST, suratesListActions, suratesListActionTypes } from './suratesList.actions'
import { SuratesListRepository } from '../domain/ports/SuratesListRepository'

type Dependencies = { suratesListRepository: SuratesListRepository }

function fetchAuthenticatedUserEpic(action$: ActionsObservable<suratesListActionTypes>,
                                    state$: StateObservable<AppState>,
                                    { suratesListRepository }: Dependencies): Observable<suratesListActionTypes> {
  return action$.pipe(
    ofType(FETCH_SURATES_LIST),
    switchMap(() => suratesListRepository.fetchAllSurates().pipe(
      tap(() => {
        console.log('in')
      }),
      map(suratesList => {
        console.log(suratesList)
        return suratesListActions.suratesListFetched(suratesList)
      }),
      catchError(() => {
        console.log('error')
        return of(suratesListActions.suratesListErrorInFetching())
      })
    ))
  )
}

export const suratesListEpics = combineEpics<suratesListActionTypes, suratesListActionTypes, AppState>(
  fetchAuthenticatedUserEpic
)
