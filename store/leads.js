import { uuid } from 'vue-uuid'
import * as FireStore from '~/repositories/leads'

export const state = () => ({
  list: []
})

export const mutations = {
  set (state, leads) {
    state.list = leads
  },
  add (state, lead) {
    state.list.push(lead)
  },
  remove (state, lead) {
    const i = state.list.indexOf(lead)
    state.list.splice(i, 1)
  },
  update (state, lead) {
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
  }
}

export const actions = {
  async getAll ({ commit }) {
    const leads = await FireStore.list()
    commit('set', leads)
  },
  async create ({ commit }, lead) {
    await FireStore.store(lead)
    commit('add', lead)
  },
  async update ({ commit }, lead) {
    await FireStore.store(lead)
    commit('update', lead)
  },
  async remove ({ commit }, lead) {
    await FireStore.remove(lead)
    commit('remove', lead)
  },
  saveLead ({ commit }, lead) {
    if (lead.id) {
      commit('update', lead)
    } else {
      lead.id = uuid.v1()
      commit('add', lead)
    }
    FireStore.store(lead)
  }
}

export const EMPTY_LEAD = {
  id: null,
  companyName: null,
  jobTitle: null,
  status: 'just a prospect',
  companyWebsite: null,
  listingWebsite: null,
  contactName: null,
  contactEmail: null,
  sentDate: null,
  notes: null
}

export const STATUSES = [
  {
    text: 'just a prospect',
    classes: 'bg-yellow-200 text-yellow-800 border-yellow-500'
  },
  {
    text: 'application sent',
    classes: 'bg-green-200 text-green-800 border-green-500'
  },
  {
    text: 'interview set',
    classes: 'bg-blue-200 text-blue-800 border-blue-500'
  },
  {
    text: 'rejected',
    classes: 'bg-red-200 text-red-800 border-red-500'
  }
]
