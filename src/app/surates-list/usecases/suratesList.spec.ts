import { AppActionsType } from '../../../config/store/rootReducer'
import { AppState } from '../../../config/store/rootState'
import { Store } from 'redux'
import { createFakeStore, fakeEpicsDependencies } from '../../../test-helper'
import { getAllSurates, isSuratesListBeingFetched, isSuratesListFetchingInError } from '../../../config/store/rootSelectors'
import { SuratesListRepository } from '../domain/ports/SuratesListRepository'
import { of, throwError } from 'rxjs'
import { suratesListActions } from './suratesList.actions'

describe('Surates', () => {
  let store: Store<AppState, AppActionsType>
  let suratesListRepository: SuratesListRepository

  beforeEach(() => {
    store = createFakeStore(fakeEpicsDependencies)
    suratesListRepository = fakeEpicsDependencies.dependencies.suratesListRepository
  })

  describe('fetch all surates', () => {
    describe('By default', () => {
      it('the surates are empty', () => {
        // Then
        expect(getAllSurates(store.getState())).toEqual([])
        expect(isSuratesListBeingFetched(store.getState())).toEqual(false)
        expect(isSuratesListFetchingInError(store.getState())).toEqual(false)
      })
    })

    describe('While fetching', () => {
      it('informs that the surates are being fetched', () => {
        // When
        store.dispatch(suratesListActions.fetchSuratesList())

        // Then
        expect(isSuratesListBeingFetched(store.getState())).toEqual(true)
      })
    })

    describe('When the suratesListRepository succeeds in fetching', () => {
      it('saves the fetched surates', async () => {
        // Given
        spyOn(suratesListRepository, 'fetchAllSurates').and.returnValue(of([{
          id: 1,
          surateNumber: 1,
          beginsWithBismillah: false,
          revelationOrder: 5,
          revelationPlace: "makkah",
          name: "Al-Fatihah",
          arabicName: "الفاتحة",
          frenchName: 'L\'ouverture',
          numberOfVerses: 7
        }]))

        // When
        await store.dispatch(suratesListActions.fetchSuratesList())

        // Then
        expect(suratesListRepository.fetchAllSurates).toHaveBeenCalledTimes(1)
        expect(getAllSurates(store.getState())).toEqual([
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
        expect(isSuratesListBeingFetched(store.getState())).toEqual(false)

      })
    })

    describe('When the suratesListRepository succeeds in fetching', () => {
      it('saves the fetched surates', async () => {
        // Given
        spyOn(suratesListRepository, 'fetchAllSurates').and.returnValue(throwError(''))

        // When
        await store.dispatch(suratesListActions.fetchSuratesList())

        // Then
        expect(isSuratesListBeingFetched(store.getState())).toEqual(false)
        expect(isSuratesListFetchingInError(store.getState())).toEqual(true)
      })
    })
  })
})