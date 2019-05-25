import { Epic } from 'redux-observable'
import { SuratesListRepository } from '../app/surates-list/domain/ports/SuratesListRepository'
import { SurateState } from '../app/surate/domain/SurateState'
import { Observable, of } from 'rxjs'
import { suratesListEpics } from '../app/surates-list/usecases/suratesList.epics'

export interface EpicsDependencies {
  dependencies: {
    suratesListRepository: SuratesListRepository
  }
}

export const appEpics: Array<Epic<any, any>> = [
  suratesListEpics
]

export const appEpicsDependencies: EpicsDependencies = {
  dependencies: {
    suratesListRepository: {
      fetchAllSurates(): Observable<SurateState[]> {
        return of([])
      }
    }
  }
}
