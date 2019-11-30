import { mutations } from '~/store/leads'

// const test = require('firebase-functions-test')()

beforeAll(() => {
  jest.mock('firebase', () => ({
    initializeApp: jest.fn()
  }))
})

describe('mutations', () => {
  it('sets list to an array of', () => {
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

  it('clears list of all leads', () => {
    const state = { list: [
      { a: 1 }, { b: 2 }, { c: 3 }
    ] }
    const { clear } = mutations
    clear(state)
    expect(state.list.length).toBe(0)
  })

  it('sets a single lead', () => {
    const state = { lead: {} }
    const lead = { companyName: 'Test' }
    const { setLead } = mutations
    setLead(state, lead)
    expect(state.lead).toEqual(lead)
  })

  it('sets a specific attribute value on the current lead', () => {
    const state = { lead: { companyName: 'test', jobTitle: 'dev' } }
    const attrObj = { attr: 'jobTitle', val: 'designer' }
    const { setAttribute } = mutations
    setAttribute(state, attrObj)
    expect(state.lead.companyName).toBe('test')
    expect(state.lead.jobTitle).toBe('designer')
  })

  it('sets updates a given lead in the list', () => {
    const state = [ { id: 1, name: 'name' }, { id: 2, name: 'name' }, { id: 3, name: 'name' } ]
    const lead = { id: 2, name: 'new name' }
    const { update } = mutations
    update(state, lead)
    expect(state.list[1]).toEqual(lead)
  })
})
