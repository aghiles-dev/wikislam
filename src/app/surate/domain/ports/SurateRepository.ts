import { Observable } from 'rxjs'
import { Verse } from '../Verse'

export interface SurateRepository {
  fetchById(id: number): Observable<Verse[]>
}
