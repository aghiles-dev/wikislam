import { RxjsHttpClient } from './rxjs.httpClient'
import { ajax } from 'rxjs/ajax'
import { EnvHandler } from '../../domain/ports/EnvHandler'

describe('Rxjs Http client', () => {
  const API_URL = '/api'
  let httpClient: RxjsHttpClient
  let envHandler: EnvHandler

  beforeEach(() => {
    envHandler = {
      get: jest.fn().mockReturnValue(API_URL)
    }

    httpClient = new RxjsHttpClient(envHandler)

    ajax.getJSON = jest.fn()
    ajax.post = jest.fn()
  })

  describe('fetch', () => {
    describe('When the given endpoint is correctly formatted', () => {
      it('makes the api call with the right params and headers', () => {
        // Given
        const fakeEndpoint = '/fakeEndpoint'
        const expectedUrl = `${API_URL}${fakeEndpoint}`
        const expectedHeaders = {
          'Content-Type': 'application/json'
        }

        // When
        httpClient.fetch(fakeEndpoint)

        // Then
        expect(ajax.getJSON).toHaveBeenCalledWith(expectedUrl, expectedHeaders)
      })
    })

    describe('When the given endpoint is incorrectly formatted', () => {
      it('makes the api call with the right params and headers', () => {
        // Given
        const fakeEndpoint = 'fakeEndpoint'
        const expectedUrl = `${API_URL}/${fakeEndpoint}`
        const expectedHeaders = {
          'Content-Type': 'application/json'
        }

        // When
        httpClient.fetch(fakeEndpoint)

        // Then
        expect(ajax.getJSON).toHaveBeenCalledWith(expectedUrl, expectedHeaders)
      })
    })
  })
})
