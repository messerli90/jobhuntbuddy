import * as FireStore from '~/repositories/leads'

export const state = () => ({
  leads: [],
  filteredLeads: [],
  lead: {},
  filter: {
    search: '',
    status: 'all'
  }
})

export const getters = {
  getLeads (state) { return state.leads },
  getFilteredLeads (state) { return state.filteredLeads },
  getLead (state) { return state.lead }
}

export const mutations = {
  setLeads (state, leads) { state.leads = leads },
  setFilteredLeads (state, leads) { state.filteredLeads = leads },
  setLead (state, lead) { state.lead = lead },

  addLead (state, lead) { state.leads.push(lead) },
  updateLead (state, lead) {
    state.leads = [
      ...state.leads.map(item => item.id !== lead.id
        ? item : {
          ...item,
          ...lead
        }
      )
    ]
  },
  removeLead (state, lead) {
    const i = state.leads.indexOf(lead)
    state.leads.splice(i, 1)
  },
  clearLeads (state) { state.leads = [] },
  filterLeads (state, filter) {
    const leads = [...state.leads]
    state.filter = filter
    state.filteredLeads = leads
    state.filteredLeads = _filterLeads(filter, leads)
  }
}

export const actions = {
  async fetchAllLeads ({ commit, rootState }) {
    const userId = await rootState.users.uid
    const leads = await FireStore.list(userId)
    await commit('setLeads', leads)
    await commit('setFilteredLeads', leads)
  },
  async fetchSingleLead ({ commit, rootState }, leadId) {
    const userId = await rootState.users.uid
    const lead = await FireStore.show(userId, leadId)
    await commit('setLead', lead)
  },
  async createLead ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    const newLead = await FireStore.create(userId, lead)
    await commit('addLead', newLead)
  },
  async updateLead ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    const updatedLead = await FireStore.update(userId, lead)
    await commit('updateLead', updatedLead)
  },
  async removeLead ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    await FireStore.remove(userId, lead)
    await commit('removeLead', lead)
  },
  async filterLeads ({ commit }, filter) {
    await commit('filterLeads', filter)
  },
  async clearLeads ({ commit }) {
    await commit('clearLeads')
  }
}

function _filterLeads (filter, leads) {
  let filteredList = [...leads]

  // Filter status
  if (filter.status === 'all') {
    filteredList = leads
  } else {
    const filtered = filteredList.filter(lead => lead.status === filter.status)
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].companyName !== null && filteredList[i].companyName.toLowerCase().includes(filter.search)) ||
        (filteredList[i].jobTitle !== null && filteredList[i].jobTitle.toLowerCase().includes(filter.search))
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}
