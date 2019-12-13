import * as Filters from '~/helpers/filters'
import * as FireStore from '~/repositories/leads'

export const state = () => ({
  leads: [],
  filteredLeads: [],
  lead: {},
  filter: {
    search: '',
    status: 'all',
    order: 'createdAt'
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
  setFilterStatus (state, status) { state.filter.status = status },
  setFilterSearch (state, search) { state.filter.search = search },
  clearLeads (state) { state.leads = [] },
  addLead (state, lead) { state.leads.push(lead) },

  removeLead (state, lead) {
    state.leads = state.leads.filter((l) => {
      return l.id !== lead.id
    })
  },
  setAttribute (state, obj) {
    state.lead[obj.attr] = obj.val
  },

  filterLeads (state) {
    const leads = [...state.leads]
    state.filteredLeads = leads
    state.filteredLeads = Filters.filterLeads(state.filter, leads)
  },
  setOrder (state, order) { state.filter.order = order },
  orderLeads (state) {
    const leads = [...state.filteredLeads]
    state.filteredLeads = Filters.orderLeads(state.filter.order, leads)
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
    // commit('setLead', lead)
    const userId = await rootState.users.uid
    const updatedLead = await FireStore.update(userId, lead)
    commit('setLead', updatedLead)
  },
  async removeLead ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    await FireStore.remove(userId, lead)
    await commit('removeLead', lead)
  },
  async setLeadById ({ commit, state, dispatch }, leadId) {
    if (!state.leads.length) {
      await dispatch('fetchSingleLead', leadId)
    } else {
      const lead = state.leads.find(l => l.id === leadId)
      if (lead) {
        commit('setLead', lead)
      } else {
        // Throw 404
      }
    }
  },
  setAttribute ({ commit }, attrObj) {
    commit('setAttribute', attrObj)
  },
  async filterOrder ({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderLeads')
  },
  async filterStatus ({ commit, dispatch }, status) {
    await commit('setFilterStatus', status)
    dispatch('filterLeads')
  },
  async filterSearch ({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterLeads')
  },
  async filterLeads ({ commit }) {
    await commit('filterLeads')
    await commit('orderLeads')
  },
  async clearLeads ({ commit }) {
    await commit('clearLeads')
  }
}
