import merge from 'lodash.merge'
import * as FireStore from '~/repositories/leads'

export const state = () => ({
  list: [],
  lead: {}
})

export const mutations = {
  set (state, leads) {
    state.list = leads
  },
  add (state, lead) {
    merge(state.list, lead)
  },
  remove (state, lead) {
    const i = state.list.indexOf(lead)
    state.list.splice(i, 1)
  },
  clear (state) {
    state.list = []
    state.lead = {}
  },
  setLead (state, lead) {
    state.lead = lead
  },
  setAttribute (state, obj) {
    state.lead[obj.attr] = obj.val
  },
  update (state, lead) {
    // merge(state.list, lead)
    state.lead = lead
    state.list = [
      ...state.list.map(item => item.id !== lead.id
        ? item : {
          ...item,
          ...lead
        }
      )
    ]
  }
}

export const getters = {
  all (state) {
    return state.list
  },
  show (state) {
    return state.lead
  },
  prospects (state) {
    return state.list.filter(lead => lead.status === 'prospect')
  },
  appSent (state) {
    return state.list.filter(lead => lead.status === 'application-sent')
  },
  interviewSet (state) {
    return state.list.filter(lead => lead.status === 'interview-set')
  },
  rejected (state) {
    return state.list.filter(lead => lead.status === 'rejected')
  }
}

export const actions = {
  async getAll ({ commit, rootState }) {
    const userId = await rootState.users.uid
    const leads = await FireStore.list(userId)
    commit('set', leads)
  },
  async create ({ dispatch, rootState }, lead) {
    const userId = await rootState.users.uid
    await FireStore.create(lead, userId)
    dispatch('getAll')
  },
  async update ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    await FireStore.update(lead, userId)
    commit('update', lead)
  },
  async remove ({ commit, rootState }, lead) {
    const userId = await rootState.users.uid
    await FireStore.remove(lead, userId)
    commit('remove', lead)
  },
  setAttribute ({ commit }, attrObj) {
    commit('setAttribute', attrObj)
  },
  setLead ({ commit, state }, leadId) {
    const lead = state.list.find(l => l.id === leadId)
    commit('setLead', lead)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

export const EMPTY_LEAD = {
  id: null,
  companyName: null,
  jobTitle: null,
  status: 'prospect',
  companyWebsite: null,
  listingUrl: null,
  contactName: null,
  contactEmail: null,
  sentDate: null,
  notes: null
}

export const STATUSES = [
  {
    key: 'prospect',
    text: 'Just a Prospect',
    classes: 'bg-yellow-200 text-yellow-800 border-yellow-500',
    baseColor: 'yellow'
  },
  {
    key: 'application-sent',
    text: 'Application Sent',
    classes: 'bg-green-200 text-green-800 border-green-500',
    baseColor: 'green'
  },
  {
    key: 'interview-set',
    text: 'Interview Set',
    classes: 'bg-blue-200 text-blue-800 border-blue-500',
    baseColor: 'blue'
  },
  {
    key: 'rejected',
    text: 'Rejected',
    classes: 'bg-red-200 text-red-800 border-red-500',
    baseColor: 'red'
  }
]
