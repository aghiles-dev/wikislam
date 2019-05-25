import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { RxjsSuratesListRepository } from './rxjs.SuratesListRepository'

describe('Surates list Repository', () => {
  let suratesListRepository: SuratesListRepository
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = {
      fetch: jest.fn()
    }

    suratesListRepository = new RxjsSuratesListRepository(httpClient)
  })


})