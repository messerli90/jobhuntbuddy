import { mutations } from '~/store/leads'

describe('mutations', () => {
  it('adds leads to the list', () => {
    const state = { list: [] }
    const leads = [
      { a: 1 }, { b: 2 }, { c: 3 }
    ]
    const { set } = mutations
    set(state, leads)
    expect(state.list.length).toBe(3)
  })

  it('adds a lead to the list', () => {
    const state = { list: [] }
    const lead = { companyName: 'Test' }
    const { add } = mutations
    add(state, lead)
    expect(state.list.indexOf(lead)).toBe(0)
  })

  it('removes a lead from the list', () => {
    const state = { list: [
      { a: 1 }, { b: 2 }, { c: 3 }
    ] }
    const lead = { b: 2 }
    const { remove } = mutations
    remove(state, lead)
    expect(state.list.indexOf(lead)).toBe(-1)
  })
})
