import { createLocalVue, shallowMount } from '@vue/test-utils'
import AppSuratesList from './AppSuratesList.vue'
import { AppSuratesListActions, AppSuratesListProps } from './AppSuratesListConnected'
import { WordingConstants } from '../../../app/shared/wordingConstants'

describe('Component | AppSuratesList', () => {
  let $router
  let localVue
  let state: AppSuratesListProps
  let actions: AppSuratesListActions

  beforeEach(() => {
    localVue = createLocalVue()
    $router = {
      push: jest.fn()
    }
    state = {
      surates: [],
      isLoading: false,
      isError: false,
      wording: WordingConstants
    }

    actions = {
      fetchSuratesList: jest.fn()
    }
  })

  describe('When surates are being fetched', () => {
    it('should match App snapshot', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
        localVue,
        mocks: { $router },
        propsData: {
          state: { ...state, isLoading: true },
          actions
        }
      })

      // Then
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('When surates have already been fetched', () => {
    it('should match App snapshot', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
        localVue,
        mocks: { $router },
        propsData: {
          state: {
            ...state,
            surates: [
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
          },
          actions
        }
      })

      // Then
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('on init', () => {
    it('fetches all the surates', () => {
      // When
      shallowMount(AppSuratesList, {
        localVue,
        mocks: { $router },
        propsData: { state, actions }
      })

      // Then
      expect(actions.fetchSuratesList).toHaveBeenCalledTimes(1)
    })
  })

})
