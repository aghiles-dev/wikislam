import { Observable } from 'rxjs'
import { SurateContentState } from '../SurateContentState'

export interface SurateRepository {
  fetchById(id: number): Observable<SurateContentState>
}
