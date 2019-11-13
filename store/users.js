import Cookies from 'js-cookie'
import firebaseApp from '~/plugins/firebase'
import * as userRepo from '~/repositories/users'

export const state = () => ({
  uid: null,
  user: null
})

export const getters = {
  uid (state) {
    if (state.user && state.user.uid) { return state.user.uid } else { return null }
  },
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user && !!state.user.uid
  }
}

export const actions = {
  async register ({ dispatch }, form) {
    await userRepo.registerWithEmailPassword(form.email, form.password).then(async (firebaseUser) => {
      await dispatch('setUser', firebaseUser.user)
    })
  },
  async login ({ dispatch }, user) {
    await userRepo.loginWithEmailPassword(user.email, user.password).then(async (firebaseUser) => {
      const token = await firebaseApp.auth().currentUser.getIdToken(true)
      Cookies.set('access_token', token)
      await dispatch('setUser', firebaseUser.user)
    })
  },
  async logout ({ commit }) {
    await firebaseApp.auth().signOut()

    Cookies.remove('access_token')
    await commit('setUser', null)
    await commit('setUid', null)
  },
  async setUser ({ commit }, user) {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }
    await commit('setUser', userInfo)
    await commit('setUid', userInfo.uid)
  }
}

export const mutations = {
  setUid (state, uid) {
    state.uid = uid
  },
  setUser (state, user) {
    state.user = user
  }
}
