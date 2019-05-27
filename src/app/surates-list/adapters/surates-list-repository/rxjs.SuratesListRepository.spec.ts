import { SuratesListRepository } from '../../domain/ports/SuratesListRepository'
import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { RxjsSuratesListRepository } from './rxjs.SuratesListRepository'
import { of } from 'rxjs'

describe('Surates list Repository', () => {
  let suratesListRepository: SuratesListRepository
  let httpClient: HttpClient

  beforeEach(() => {
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

    suratesListRepository = new RxjsSuratesListRepository(httpClient)
  })

  describe('fetch all surates', () => {
    it('fetches the list of surates at the right url', done => {
      // Given
      const expectedUrl = 'chapters?language=fr'

      // When
      const suralesList$ = suratesListRepository.fetchAllSurates()

      // Then
      suralesList$.subscribe(result => {
        expect(httpClient.fetch).toHaveBeenCalledTimes(1)
        expect(httpClient.fetch).toHaveBeenCalledWith(expectedUrl)
        expect(result).toEqual([
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
        ])
        done()
      })
    })
  })
})