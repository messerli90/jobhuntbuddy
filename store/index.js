import * as FireStore from '~/repositories/leads'
export const actions = {
  async nuxtServerInit ({ commit }, context) {
    const leads = await FireStore.list()
    commit('leads/set', leads)
  }
}
