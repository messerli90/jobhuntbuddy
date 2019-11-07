import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/Index'
describe('Index Page', () => {
  it('should display a welcome message', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.text()).toContain('Welcome')
  })
})
