import { getters } from '../../../../store/leads'

describe('lead store getters', () => {
  it('gets all leads', () => {
    const state = _initState()
    const result = getters.getLeads(state)

    expect(result).toEqual([
      { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobtitle: 'developer' },
      { id: 'ghi', companyName: 'Aviato', jobtitle: 'engineer' }
    ])
  })

  it('gets filtered leads', () => {
    const state = _initState()
    const result = getters.getFilteredLeads(state)

    expect(result).toEqual([
      { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobtitle: 'developer' }
    ])
  })

  it('gets current lead', () => {
    const state = _initState()
    const result = getters.getLead(state)

    expect(result).toEqual(
      { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' }
    )
  })
})

function _initState () {
  const state = {
    leads: [
      { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobtitle: 'developer' },
      { id: 'ghi', companyName: 'Aviato', jobtitle: 'engineer' }
    ],
    filteredLeads: [
      { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobtitle: 'developer' }
    ],
    lead: { id: 'abc', companyName: 'Hooli', jobtitle: 'developer' },
    filter: {
      search: 'dev',
      status: 'all',
      order: 'createdAt'
    }
  }
  return state
}
