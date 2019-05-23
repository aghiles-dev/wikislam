import { appEpics, appEpicsDependencies } from './rootEpicMiddleware'
import { ReduxStore } from './rootStore'

export const AppStore = new ReduxStore().configure({
  reduxObservable: {
    epics: appEpics,
    dependencies: appEpicsDependencies
  }
})

