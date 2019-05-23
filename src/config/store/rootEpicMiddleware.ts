import { Epic } from 'redux-observable'

export interface EpicsDependencies {
  dependencies: {}
}

export const appEpics: Array<Epic<any, any>> = []

export const appEpicsDependencies: EpicsDependencies = {
  dependencies: {}
}
