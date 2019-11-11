import { uuid } from 'vue-uuid'

export const state = () => ({
  list: [
    {
      uuid: uuid.v1(),
      companyName: 'Stripe',
      jobTitle: 'Senior PHP Developer',
      status: 'application sent',
      companyWebsite: 'https://stripe.com',
      listingWebsite: 'https://stripe.com/careers',
      contactName: 'Nicole Samsung',
      contactEmail: 'nicole@stripe.com'
    },
    {
      uuid: uuid.v1(),
      companyName: 'NomadList',
      status: 'rejected',
      companyWebsite: 'https://nomadlist.com',
      contactName: 'Pieter'
    },
    {
      uuid: uuid.v1(),
      jobTitle: 'Q/A Analyst',
      status: 'application sent'
    }
  ]
})

export const mutations = {
  add (state, lead) {
    state.list.push(lead)
  },
  remove (state, lead) {
    const i = state.list.indexOf(lead)
    state.list.splice(i, 1)
  },
  update (state, lead) {
    state.list = [
      ...state.list.map(item => item.uuid !== lead.uuid
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
  saveLead ({ commit }, lead) {
    if (lead.uuid) {
      commit('update', lead)
    } else {
      lead.uuid = uuid.v1()
      commit('add', lead)
    }
  },
  remove ({ commit }, lead) {
    commit('remove', lead)
  }
}

export const EMPTY_LEAD = {
  uuid: null,
  companyName: null,
  jobTitle: null,
  status: 'just a prospect',
  companyWebsite: null,
  listingWebsite: null,
  contactName: null,
  contactEmail: null,
  sentDate: null
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
