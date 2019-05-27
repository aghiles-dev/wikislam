import { appEpics, EpicsDependencies } from './config/store/rootEpicMiddleware'
import { ReduxStore } from './config/store/rootStore'
import { AppState } from './config/store/rootState'
import { Store } from 'redux'

export const fakeEpicsDependencies: EpicsDependencies = {
  dependencies: {
    suratesListRepository: {
      fetchAllSurates: jest.fn()
    }
  }
}

export function createFakeStore(epicsDependencies: EpicsDependencies = fakeEpicsDependencies): Store<AppState> {
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
