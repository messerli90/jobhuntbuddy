import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index'
describe('Index Page', () => {
  it('should display a welcome message', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.text()).toContain('how you manage')
  })
})
