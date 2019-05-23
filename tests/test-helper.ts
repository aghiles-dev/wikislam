import { appEpics, EpicsDependencies } from '../src/config/store/rootEpicMiddleware'
import { ReduxStore } from '../src/config/store/rootStore'
import { AppState } from '../src/config/store/rootState'
import { Store } from 'redux'

export const FakeEpicsDependencies: EpicsDependencies = {
  dependencies: {}
}

export function createFakeStore(epicsDependencies: EpicsDependencies = FakeEpicsDependencies): Store<AppState> {
  const promisify = store => next => action => {
    return new Promise(resolve => {
      const result = next(action)
      return resolve(result)
    })
  }

  return new ReduxStore().configure({
    reduxObservable: { epics: appEpics, dependencies: epicsDependencies }
  }, [promisify])
}
