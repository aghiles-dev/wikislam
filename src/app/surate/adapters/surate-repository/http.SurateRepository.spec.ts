import { HttpClient } from '../../../shared/domain/ports/HttpClient'
import { SurateRepository } from '../../domain/ports/SurateRepository'
import { HttpSurateRepository } from './http.SurateRepository'
import { EnvHandler } from '../../../shared/domain/ports/EnvHandler'
import { CacheHandler } from '../../domain/ports/CacheHandler'
import { of } from 'rxjs'

describe('Surate Repository', () => {
  let surateRepository: SurateRepository
  let httpClient: HttpClient
  let envHandler: EnvHandler
  let cacheHandler: CacheHandler

  beforeEach(() => {
    cacheHandler = {
      get: jest.fn(),
      set: jest.fn()
    }
    envHandler = {
      get: jest.fn().mockReturnValue(1)
    }
    httpClient = {
      fetch: jest.fn()
    }

    surateRepository = new HttpSurateRepository(httpClient, envHandler, cacheHandler)
  })

  describe('fetch surate by id', () => {
    describe('When the data is cached', () => {
      it('returns the cached data', async done => {
        // Given
        const chapterId = 1
        const cachedVerses = [
          {
            id: 1,
            verseNumber: 1,
            chapterId,
            verseKey: '1:1',
            arabicText: 'fake arabic text',
            frenchText: 'fake french text',
            juzNumber: 1,
            hizbNumber: 1,
            sajdah: false
          }
        ]
        spyOn(cacheHandler, 'get').and.returnValue(cachedVerses)

        // When
        const result = await surateRepository.fetchById(chapterId)

        // Then
        result.subscribe(verses => {
          expect(cacheHandler.get).toHaveBeenCalledWith(`/chapters/${chapterId}/verses?translations=31&language=fr&text_type=words&limit=1`)
          expect(verses).toEqual(cachedVerses)
          expect(httpClient.fetch).toHaveBeenCalledTimes(0)
          done()
        })
      })
    })

    describe('When the data is not cached', () => {
      it('returns all the verses', async done => {
        // Given
        const chapterId = 1
        const baseUrl = `/chapters/${chapterId}/verses?translations=31&language=fr&text_type=words&limit=1`

        spyOn(cacheHandler, 'get').and.returnValue(undefined)
        httpClient.fetch = jest.fn()
          .mockReturnValueOnce(of({
            meta: {
              total_pages: 2
            }
          }))
          .mockReturnValueOnce(of({
            verses: [
              {
                id: 1,
                verse_number: 1,
                chapter_id: chapterId,
                verse_key: '1:1',
                text_madani: 'fake arabic text',
                juz_number: 1,
                hizb_number: 1,
                sajdah: null,
                translations: [
                  {
                    text: 'fake french text'
                  }
                ]
              }
            ]
          }))
          .mockReturnValue(of({
            verses: [
              {
                id: 2,
                verse_number: 2,
                chapter_id: chapterId,
                verse_key: '1:2',
                text_madani: 'fake arabic text 2',
                juz_number: 2,
                hizb_number: 2,
                sajdah: true,
                translations: [
                  {
                    text: 'fake french text 2'
                  }
                ]
              }
            ]
          }))

        const expectedVerses = [
          {
            id: 1,
            verseNumber: 1,
            chapterId,
            verseKey: '1:1',
            arabicText: 'fake arabic text',
            frenchText: 'fake french text',
            juzNumber: 1,
            hizbNumber: 1,
            sajdah: false
          },
          {
            id: 2,
            verseNumber: 2,
            chapterId,
            verseKey: '1:2',
            arabicText: 'fake arabic text 2',
            frenchText: 'fake french text 2',
            juzNumber: 2,
            hizbNumber: 2,
            sajdah: true
          }
        ]

        // When
        const result = await surateRepository.fetchById(chapterId)

        // Then
        result.subscribe(verses => {
          expect(cacheHandler.get).toHaveBeenCalledWith(baseUrl)
          expect(verses).toEqual(expectedVerses)
          expect(httpClient.fetch).toHaveBeenCalledTimes(3)
          expect(httpClient.fetch).toHaveBeenNthCalledWith(1, `${baseUrl}`)
          expect(httpClient.fetch).toHaveBeenNthCalledWith(2, `${baseUrl}&page=1`)
          expect(httpClient.fetch).toHaveBeenNthCalledWith(3, `${baseUrl}&page=2`)
          expect(cacheHandler.set).toHaveBeenCalledWith(baseUrl, expectedVerses)
          setTimeout(() => done(), 200)
          done()
        })
      })
    })
  })
})