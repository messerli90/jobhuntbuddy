import moment from 'moment'
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
  setFilter (state, filter) { state.filter = filter },
  setFilterStatus (state, status) { state.filter.status = status },
  setFilterSearch (state, search) { state.filter.search = search },

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
  filterLeads (state) {
    const leads = [...state.leads]
    state.filteredLeads = leads
    state.filteredLeads = _filterLeads(state.filter, leads)
  },
  setOrder (state, order) { state.filter.order = order },
  orderLeads (state) {
    const leads = [...state.filteredLeads]
    state.filteredLeads = _orderLeads(state.filter.order, leads)
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
    commit('setLead', lead)
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

function _filterLeads (filter, leads) {
  let filteredList = [...leads]

  // Filter status
  if (filter.status !== 'all') {
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

function _orderLeads (order, leads) {
  const orderedList = [...leads]

  if (order === 'createdAt') {
    orderedList.sort(function (a, b) {
      const unixA = moment(a.createdAt)
      const unixB = moment(b.createdAt)
      return unixA < unixB ? -1 : 1
    })
  } else if (order === 'companyName') {
    orderedList.sort(function (a, b) {
      const nameA = a.companyName.toLowerCase()
      const nameB = b.companyName.toLowerCase()
      return nameA < nameB ? -1 : 1
    })
  } else if (order === 'jobTitle') {
    orderedList.sort(function (a, b) {
      const nameA = a.jobTitle ? a.jobTitle.toLowerCase() : 'zzz'
      const nameB = b.jobTitle ? b.jobTitle.toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}
