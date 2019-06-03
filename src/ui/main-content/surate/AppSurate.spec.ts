import { shallowMount } from '@vue/test-utils'
import AppSuratesList from './AppSurate.vue'
import { AppSurateActions, AppSurateProps } from './AppSurateConnected'
import { WordingConstants } from '../../../app/shared/wordingConstants'

describe('Component | AppSurates', () => {
  let state: AppSurateProps
  let actions: AppSurateActions

  beforeEach(() => {
    state = {
      surateId: 1,
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
      isLoading: false,
      wording: WordingConstants
    }

    actions = {
      fetchSurateById: jest.fn(),
      resetCurrentSurate: jest.fn(),
      fetchAllSurates: jest.fn()
    }
  })

  describe('When the surate is being fetched', () => {
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

  describe('When the surate has already been fetched', () => {
    it('should match snapshot', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
        propsData: { state, actions }
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
      expect(actions.fetchSurateById).toHaveBeenCalledWith(state.surateId)
      expect(actions.fetchAllSurates).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the component is about to be destroyed', () => {
    it('resets the current surate', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
        propsData: { state, actions }
      })

      // When
      wrapper.destroy()

      // Then
      expect(actions.resetCurrentSurate).toHaveBeenCalledTimes(1)
    })
  })

})
