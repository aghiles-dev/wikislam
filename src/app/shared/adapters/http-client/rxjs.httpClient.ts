import { HttpClient } from '../../domain/ports/HttpClient'
import { Observable } from 'rxjs'
import { EnvHandler, EnvKey } from '../../domain/ports/EnvHandler'
import { ajax } from 'rxjs/ajax'

export class RxjsHttpClient implements HttpClient {
  private readonly API_URL: string = this.envHandler.get(EnvKey.API_URL)

  constructor(private envHandler: EnvHandler) {
  }

  fetch<T>(endpoint: string): Observable<T> {
    return ajax.getJSON(this.constructFullUrl(endpoint), this.headers)
  }

  private constructFullUrl(endpoint: string): string {
    const separator = endpoint.startsWith('/') ? '' : '/'
    return this.API_URL + separator + endpoint
  }

  private get headers() {
    return {
      'Content-Type': 'application/json'
    }
  }
}
