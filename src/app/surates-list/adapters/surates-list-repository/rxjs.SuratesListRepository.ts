import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { Observable } from 'rxjs'
import { SurateState } from '../../../surate/domain/SurateState'

export class RxjsSuratesListRepository implements SuratesListRepository{

  constructor(private httpClient: HttpClient) {}

  fetchAllSurates(): Observable<SurateState[]> {
    return undefined;
  }
}