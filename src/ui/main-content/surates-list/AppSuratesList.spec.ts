import { shallowMount } from '@vue/test-utils'
import AppSuratesList from './AppSuratesList.vue'

describe('Component | AppSuratesList', () => {
  describe('When user is authenticated', () => {
    it('should match App snapshot', () => {
      // Given
      const wrapper = shallowMount(AppSuratesList, {
        propsData: {  }
      })

      // Then
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
