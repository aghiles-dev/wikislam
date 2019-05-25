import { Observable } from 'rxjs'

export interface HttpClient {
  fetch<T>(endpoint: string): Observable<T>
}
