import { applyMiddleware, createStore, Middleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  ActionsObservable,
  combineEpics,
  createEpicMiddleware,
  Epic,
  StateObservable
} from 'redux-observable'
import { BehaviorSubject, Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { EpicsDependencies } from './rootEpicMiddleware'
import { AppActionsType, RootReducer } from './rootReducer'
import { AppState } from './rootState'

import reduxImmutableState from 'redux-immutable-state-invariant'

interface ReduxObservableParameters {
  epics: Array<Epic<AppActionsType, AppActionsType>>
  dependencies: EpicsDependencies
}

interface MiddlewareParameters {
  reduxObservable: ReduxObservableParameters
}

export class ReduxStore {
  private _epic$: Subject<
    Epic<AppActionsType, AppActionsType>
  > = new BehaviorSubject(combineEpics())

  configure (
    middlewareParameters: MiddlewareParameters,
    additionalMiddlewares: Middleware[] = []
  ): Store<AppState> {
    const reduxObservableMiddleware = createEpicMiddleware(
      middlewareParameters.reduxObservable.dependencies
    )

    const store = createStore<AppState, AppActionsType, any, any>(
      RootReducer,
      this.createStoreEnhancer(reduxObservableMiddleware, additionalMiddlewares)
    )

    this.runReduxObservable(reduxObservableMiddleware)

    for (const epic of middlewareParameters.reduxObservable.epics) {
      this.addEpic(epic)
    }

    return store
  }

  private createStoreEnhancer (
    reduxObservableMiddleware,
    additionalMiddlewares: Middleware[]
  ) {
    const middlewares = [...additionalMiddlewares, reduxObservableMiddleware]
    return process.env.APP_DEBUG === 'true'
      ? composeWithDevTools(
          applyMiddleware(...middlewares, reduxImmutableState())
        )
      : applyMiddleware(...middlewares)
  }

  private runReduxObservable (reduxObservableMiddleware) {
    const rootEpic: any = (
      action$: ActionsObservable<AppActionsType>,
      state$: StateObservable<AppState>,
      dependencies: EpicsDependencies
    ) =>
      this._epic$.pipe(mergeMap(epic => epic(action$, state$, dependencies)))
    reduxObservableMiddleware.run(rootEpic)
  }

  private addEpic (epic: Epic<AppActionsType, AppActionsType>): void {
    this._epic$.next(epic)
  }
}
