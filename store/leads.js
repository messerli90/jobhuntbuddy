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
      contactName: 'Nicole Samsung'
    },
    {
      uuid: uuid.v1(),
      companyName: 'NomadList',
      status: 'rejected',
      companyWebsite: 'https://nomadlist.com'
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
  }
}

export const EMPTY_LEAD = {
  uuid: null,
  companyName: null,
  jobTitle: null,
  status: null,
  companyWebsite: null
}
