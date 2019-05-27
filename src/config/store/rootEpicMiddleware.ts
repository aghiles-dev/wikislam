import { Epic } from 'redux-observable'
import { SuratesListRepository } from '../../app/surates-list/domain/ports/SuratesListRepository'
import { Observable, of } from 'rxjs'
import { suratesListEpics } from '../../app/surates-list/usecases/suratesList.epics'
import { SurateRepository } from '../../app/surate/domain/ports/SurateRepository'
import { RxjsSuratesListRepository } from '../../app/surates-list/adapters/surates-list-repository/rxjs.SuratesListRepository'
import { HttpClient } from '../../app/shared/domain/ports/HttpClient'
import { RxjsHttpClient } from '../../app/shared/adapters/http-client/rxjs.httpClient'
import { EnvHandler } from '../../app/shared/domain/ports/EnvHandler'
import { NodeEnvHandler } from '../../app/shared/adapters/node-env-handler/node.env-handler'
import { SurateContentState } from '../../app/surate/domain/SurateContentState'
import { surateEpics } from '../../app/surate/usecases/surate.epics'

export interface EpicsDependencies {
  dependencies: {
    suratesListRepository: SuratesListRepository,
    surateRepository: SurateRepository
  }
}

export const appEpics: Array<Epic<any, any>> = [
  suratesListEpics,
  surateEpics
]

const envHandler: EnvHandler = new NodeEnvHandler()
const httpClient: HttpClient = new RxjsHttpClient(envHandler)

export const appEpicsDependencies: EpicsDependencies = {
  dependencies: {
    suratesListRepository: new RxjsSuratesListRepository(httpClient),
    surateRepository: {
      fetchById(id: number): Observable<SurateContentState>  {
        return of({
          verses: [],
          isLoading: false,
        })
      }
    }
  }
}
