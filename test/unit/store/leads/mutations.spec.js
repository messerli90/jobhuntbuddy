import { mutations } from '../../../../store/leads'

describe('lead store mutations', () => {
  it('sets leads', () => {
    const state = _emptyState()
    const leads = [
      { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' },
      { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer' }
    ]
    const newState = {
      leads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
        { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' },
        { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer' }
      ],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.setLeads(state, leads)
    expect(state).toEqual(newState)
  })

  it('sets filtered leads', () => {
    const state = _emptyState()
    const filteredLeads = [
      { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
      { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' }
    ]
    const newState = {
      leads: [],
      filteredLeads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
        { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' }
      ],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }
    mutations.setFilteredLeads(state, filteredLeads)
    expect(state).toEqual(newState)
  })

  it('sets current lead', () => {
    const state = _emptyState()
    const currentLead = { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' }
    const newState = {
      leads: [],
      filteredLeads: [],
      lead: { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.setLead(state, currentLead)
    expect(state).toEqual(newState)
  })

  it('sets status to filter by', () => {
    const state = _emptyState()
    const status = 'application-sent'
    const newState = {
      leads: [],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'application-sent',
        order: 'createdAt'
      }
    }

    mutations.setFilterStatus(state, status)
    expect(state).toEqual(newState)
  })

  it('sets search term to filter by', () => {
    const state = _emptyState()
    const search = 'dev'
    const newState = {
      leads: [],
      filteredLeads: [],
      lead: {},
      filter: {
        search: 'dev',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.setFilterSearch(state, search)
    expect(state).toEqual(newState)
  })

  it('clears leads', () => {
    const state = {
      leads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
        { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' },
        { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer' }
      ],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }
    const newState = _emptyState()

    mutations.clearLeads(state)
    expect(state).toEqual(newState)
  })

  it('adds lead to leads', () => {
    const state = _emptyState()
    const lead = { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' }
    const newState = {
      leads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' }
      ],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.addLead(state, lead)
    expect(state).toEqual(newState)
  })

  it('removes lead from leads', () => {
    const state = {
      leads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
        { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' },
        { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer' }
      ],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }
    const lead = { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer' }
    const newState = {
      leads: [
        { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
        { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer' }
      ],
      filteredLeads: [],
      lead: {},
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.removeLead(state, lead)
    expect(state).toEqual(newState)
  })

  it('sets given attribute on lead', () => {
    const state = {
      leads: [],
      filteredLeads: [],
      lead: { id: 'abc', companyName: 'Hooli', jobTitle: 'developer' },
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }
    const obj = { attr: 'jobTitle', val: 'engineer' }
    const newState = {
      leads: [],
      filteredLeads: [],
      lead: { id: 'abc', companyName: 'Hooli', jobTitle: 'engineer' },
      filter: {
        search: '',
        status: 'all',
        order: 'createdAt'
      }
    }

    mutations.setAttribute(state, obj)
    expect(state).toEqual(newState)
  })

  describe('lead filtering', () => {
    it('filters leads by search term', () => {
      const state = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'interview-set' }
        ],
        filteredLeads: [],
        lead: {},
        filter: {
          search: 'dev',
          status: 'all',
          order: 'createdAt'
        }
      }
      const newState = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'interview-set' }
        ],
        filteredLeads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' }
        ],
        lead: {},
        filter: {
          search: 'dev',
          status: 'all',
          order: 'createdAt'
        }
      }

      mutations.filterLeads(state)
      expect(state).toEqual(newState)
    })

    it('filters leads by status', () => {
      const state = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'interview-set' }
        ],
        filteredLeads: [],
        lead: {},
        filter: {
          search: '',
          status: 'interview-set',
          order: 'createdAt'
        }
      }
      const newState = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'interview-set' }
        ],
        filteredLeads: [
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'interview-set' }
        ],
        lead: {},
        filter: {
          search: '',
          status: 'interview-set',
          order: 'createdAt'
        }
      }

      mutations.filterLeads(state)
      expect(state).toEqual(newState)
    })

    it('filters leads by status and search term', () => {
      const state = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [],
        lead: {},
        filter: {
          search: 'dev',
          status: 'application-sent',
          order: 'createdAt'
        }
      }
      const newState = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' }
        ],
        lead: {},
        filter: {
          search: 'dev',
          status: 'application-sent',
          order: 'createdAt'
        }
      }

      mutations.filterLeads(state)
      expect(state).toEqual(newState)
    })
  })

  describe('lead ordering', () => {
    it('sets order', () => {
      const state = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [],
        lead: {},
        filter: {
          search: '',
          status: 'all',
          order: 'createdAt'
        }
      }
      const order = 'companyName'
      const newState = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [],
        lead: {},
        filter: {
          search: '',
          status: 'all',
          order: 'companyName'
        }
      }

      mutations.setOrder(state, order)
      expect(state).toEqual(newState)
    })

    it('orders leads by companyName', () => {
      const state = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        lead: {},
        filter: {
          search: '',
          status: 'all',
          order: 'companyName'
        }
      }
      const newState = {
        leads: [
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' },
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' }
        ],
        filteredLeads: [
          { id: 'ghi', companyName: 'Aviato', jobTitle: 'engineer', status: 'application-sent' },
          { id: 'abc', companyName: 'Hooli', jobTitle: 'developer', status: 'prospect' },
          { id: 'def', companyName: 'Pied Piper', jobTitle: 'developer', status: 'application-sent' }
        ],
        lead: {},
        filter: {
          search: '',
          status: 'all',
          order: 'companyName'
        }
      }

      mutations.orderLeads(state)
      expect(state).toEqual(newState)
    })
  })
})

function _emptyState () {
  const state = {
    leads: [],
    filteredLeads: [],
    lead: {},
    filter: {
      search: '',
      status: 'all',
      order: 'createdAt'
    }
  }
  return state
}
