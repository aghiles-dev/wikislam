import { of, throwError } from 'rxjs'
import { Store } from 'redux'
import { AppState } from '../../../config/store/rootState'
import { AppActionsType } from '../../../config/store/rootReducer'
import { createFakeStore, fakeEpicsDependencies } from '../../../test-helper'
import { SurateRepository } from '../domain/ports/SurateRepository'
import { getCurrentSurate } from '../../../config/store/rootSelectors'
import { surateActions } from './surate.actions'

describe('Surates', () => {
  let store: Store<AppState, AppActionsType>
  let surateRepository: SurateRepository

  beforeEach(() => {
    store = createFakeStore(fakeEpicsDependencies)
    surateRepository = fakeEpicsDependencies.dependencies.surateRepository
  })

  describe('fetch surate by id', () => {
    describe('By default', () => {
      it('the surates are empty', () => {
        // Then
        expect(getCurrentSurate(store.getState())).toEqual({
          verses: [],
          isLoading: false
        })
      })
    })

    describe('While fetching', () => {
      it('informs that the surate is being fetched', () => {
        // Given
        const surateId = 1

        // When
        store.dispatch(surateActions.fetchSurateById(surateId))

        // Then
        expect(getCurrentSurate(store.getState()).isLoading).toEqual(true)
      })
    })

    describe('When the surateRepository succeeds in fetching', () => {
      it('saves the fetched surate', async () => {
        // Given
        const surateId = 1
        spyOn(surateRepository, 'fetchById').and.returnValue(of([
          {
            id: 1,
            verseNumber: 1,
            chapterId: 2,
            verseKey: '2:1',
            arabicText: 'fake arabic text',
            frenchText: 'fake french text',
            juzNumber: 1,
            hizbNumber: 1,
            sajdah: false
          }
        ]))

        // When
        await store.dispatch(surateActions.fetchSurateById(surateId))

        // Then
        expect(surateRepository.fetchById).toHaveBeenCalledTimes(1)
        expect(surateRepository.fetchById).toHaveBeenCalledWith(surateId)
        expect(getCurrentSurate(store.getState())).toEqual({
          verses: [
            {
              id: 1,
              verseNumber: 1,
              chapterId: 2,
              verseKey: '2:1',
              arabicText: 'fake arabic text',
              frenchText: 'fake french text',
              juzNumber: 1,
              hizbNumber: 1,
              sajdah: false
            }
          ],
          isLoading: false
        })
      })
    })

    describe('When the surateRepository fails in fetching', () => {
      it('informs that the loading is done', async () => {
        // Given
        spyOn(surateRepository, 'fetchById').and.returnValue(throwError(''))

        // When
        await store.dispatch(surateActions.fetchSurateById(1))

        // Then
        expect(getCurrentSurate(store.getState()).isLoading).toEqual(false)
      })
    })
  })

  describe('reset current surate  ', () => {
    it('empties the current surate', async () => {
      // Given
      const surateId = 1
      spyOn(surateRepository, 'fetchById').and.returnValue(of([
        {
          id: 1,
          verseNumber: 1,
          chapterId: 2,
          verseKey: '2:1',
          arabicText: 'fake arabic text',
          frenchText: 'fake french text',
          juzNumber: 1,
          hizbNumber: 1,
          sajdah: false
        }
      ]))

      await store.dispatch(surateActions.fetchSurateById(surateId))

      // When
      await store.dispatch(surateActions.resetCurrentSurate())

      // Then
      expect(getCurrentSurate(store.getState())).toEqual({
        verses: [],
        isLoading: false
      })
    })
  })
})
