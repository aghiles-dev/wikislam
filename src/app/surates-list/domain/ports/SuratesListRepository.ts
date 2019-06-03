import { SurateState } from '../SurateState'
import { Observable } from 'rxjs'

export interface SuratesListRepository {
  fetchAllSurates(): Observable<SurateState[]>
}
