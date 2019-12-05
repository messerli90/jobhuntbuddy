import * as FireStore from '~/repositories/leads'

export const state = () => ({
  leads: [],
  filteredLeads: [],
  lead: {}
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
  filterStatus (state, status) {
    if (status === 'all') {
      state.filteredLeads = [...state.leads]
    } else {
      const filtered = state.leads.filter(lead => lead.status === status)
      state.filteredLeads = filtered
    }
  },
  filterSearch (state, search) {
    let list = []
    if (search === '') {
      list = [...state.leads]
    } else {
      state.leads.map((lead) => {
        if (
          (lead.companyName && lead.companyName.toLowerCase().includes(search)) ||
          (lead.jobTitle && lead.jobTitle.toLowerCase().includes(search))
        ) {
          list.push(lead)
        }
      })
    }
    state.filteredLeads = list
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
  async filterStatus ({ commit }, status) {
    await commit('filterStatus', status)
  },
  async filterSearch ({ commit }, search) {
    await commit('filterSearch', search)
  },
  async filteredLeads () {},
  async clearLeads ({ commit }) {
    await commit('clearLeads')
  }
}
