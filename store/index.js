import * as FireStore from '~/repositories/leads'
import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    const leads = await FireStore.list()
    commit('leads/set', leads)

    const user = getUserFromCookie(req)
    console.log(user)
    if (user) {
      await dispatch('users/setUser', {
        name: user.name,
        email: user.email,
        avatar: user.picture,
        uid: user.user_id
      })
    }
  }
}
