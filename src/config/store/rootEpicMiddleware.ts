import { Epic } from 'redux-observable'
import { SuratesListRepository } from '../app/surates-list/domain/ports/SuratesListRepository'
import { SurateState } from '../app/surate/domain/SurateState'
import { Observable, of } from 'rxjs'
import { suratesListEpics } from '../app/surates-list/usecases/suratesList.epics'

export interface EpicsDependencies {
  dependencies: {
    surateRepository: SuratesListRepository
  }
}

export const appEpics: Array<Epic<any, any>> = [
  suratesListEpics
]

export const appEpicsDependencies: EpicsDependencies = {
  dependencies: {
    surateRepository: {
      fetchAllSurates(): Observable<SurateState[]> {
        return of([])
      }
    }
  }
}
