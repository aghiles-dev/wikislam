import { shallowMount } from '@vue/test-utils'
import AppSuratesList from './AppSuratesList.vue'
import { AppSuratesListActions, AppSuratesListProps } from './AppSuratesListConnected'

describe('Component | AppSuratesList', () => {
  let state: AppSuratesListProps
  let actions: AppSuratesListActions

  beforeEach(() => {
    state = {
      surates: [],
      isLoading: false,
      isError: false,
      wording: {}
    }

    actions = {
      fetchSuratesList: jest.fn()
    }
  })

  describe('When surates are being fetched', () => {
    it('should match App snapshot', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
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
        propsData: { state, actions }
      })

      // Then
      expect(actions.fetchSuratesList).toHaveBeenCalledTimes(1)
    })
  })

})
