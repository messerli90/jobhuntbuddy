import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)

    if (user) {
      await dispatch('users/setUser', {
        email: user.email,
        uid: user.user_id
      })
      await dispatch('leads/fetchAllLeads')
    }
  }
}
