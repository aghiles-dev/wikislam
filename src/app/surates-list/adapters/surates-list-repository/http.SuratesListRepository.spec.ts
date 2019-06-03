import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { HttpSuratesListRepository } from './http.SuratesListRepository'
import { of } from 'rxjs'
import { CacheHandler } from '../../../shared/domain/ports/CacheHandler'

describe('Surates list Repository', () => {
  let suratesListRepository: SuratesListRepository
  let httpClient: HttpClient
  let cacheHandler: CacheHandler

  beforeEach(() => {
    cacheHandler = {
      get: jest.fn(),
      set: jest.fn(),
    }
    httpClient = {
      fetch: jest.fn().mockReturnValue(of({
        chapters: [
          {
            id: 1,
            chapter_number: 1,
            bismillah_pre: false,
            revelation_order: 5,
            revelation_place: "makkah",
            name_arabic: "الفاتحة",
            name_simple: "Al-Fatihah",
            verses_count: 7,
            translated_name: {
              language_name: "french",
              name: "L'ouverture"
            }
          }
        ]
      }))
    }

    suratesListRepository = new HttpSuratesListRepository(httpClient, cacheHandler)
  })

  describe('fetch all surates', () => {
    describe('When the surates are not cached', () => {
      it('fetches the list of surates at the right url', done => {
        // Given
        spyOn(cacheHandler, 'get').and.returnValue(undefined)
        const expectedUrl = 'chapters?language=fr'
        const expectedSuratesList = [
          {
            id: 1,
            surateNumber: 1,
            beginsWithBismillah: false,
            revelationOrder: 5,
            revelationPlace: "makkah",
            name: "Al-Fatihah",
            arabicName: "الفاتحة",
            frenchName: 'L\'ouverture',
            numberOfVerses: 7
          }
        ]

        // When
        const suralesList$ = suratesListRepository.fetchAllSurates()

        // Then
        suralesList$.subscribe(result => {
          expect(cacheHandler.get).toHaveBeenCalledWith(expectedUrl)
          expect(httpClient.fetch).toHaveBeenCalledTimes(1)
          expect(httpClient.fetch).toHaveBeenCalledWith(expectedUrl)
          expect(result).toEqual(expectedSuratesList)
          expect(cacheHandler.set).toHaveBeenCalledWith(expectedUrl, expectedSuratesList)
          done()
        })
      })
    })

    describe('When the surates are cached', () => {
      it('returns the cached surates', done => {
        // Given
        const expectedSuratesList = [
          {
            id: 1,
            surateNumber: 1,
            beginsWithBismillah: false,
            revelationOrder: 5,
            revelationPlace: "makkah",
            name: "Al-Fatihah",
            arabicName: "الفاتحة",
            frenchName: 'L\'ouverture',
            numberOfVerses: 7
          }
        ]
        spyOn(cacheHandler, 'get').and.returnValue(expectedSuratesList)
        const url = 'chapters?language=fr'

        // When
        const suralesList$ = suratesListRepository.fetchAllSurates()

        // Then
        suralesList$.subscribe(result => {
          expect(cacheHandler.get).toHaveBeenCalledWith(url)
          expect(httpClient.fetch).toHaveBeenCalledTimes(0)
          expect(result).toEqual(expectedSuratesList)
          done()
        })
      })
    })
  })
})
