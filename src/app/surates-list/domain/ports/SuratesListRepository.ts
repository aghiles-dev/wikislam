import { SurateState } from '../../../surate/domain/SurateState'
import { Observable } from 'rxjs'

export interface SuratesListRepository {
  fetchAllSurates(): Observable<SurateState[]>
}