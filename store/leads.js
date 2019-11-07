export const state = () => ({
  list: [
    {
      companyName: 'Stripe',
      jobTitle: 'Senior PHP Developer',
      status: 'application sent',
      companyWebsite: 'https://stripe.com'
    },
    {
      companyName: 'NomadList',
      status: 'rejected',
      companyWebsite: 'https://nomadlist.com'
    },
    {
      jobTitle: 'Q/A Analyst',
      status: 'application sent'
    }
  ],
  currentLead: null
})

export const mutations = {
  add (state, lead) {
    state.list.push(lead)
  },
  setCurrentLead (state, lead) {
    state.currentLead = lead
  }
}

export const getters = {
  getAll (state) {
    return state.list
  },
  getCurrentLead (state) {
    return state.currentLead
  }
}

export const actions = {
  getLeads ({ state }) {
    return state.list
  },
  setCurrentLead ({ commit }, lead) {
    commit('setCurrentLead', lead)
  },
  clearCurrentLead ({ commit }) {
    commit('setCurrentLead', null)
  },
  createLead ({ commit }, data) {
    const lead = {
      companyName: data.name
    }
    commit('add', lead)
  }
}
