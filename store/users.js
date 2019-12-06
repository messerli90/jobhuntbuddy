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
    await userRepo.registerWithEmailPassword(form).then(async (firebaseUser) => {
      const token = await firebaseUser.user.getIdToken()
      Cookies.set('access_token', token)
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
  async loginWithTwitter ({ dispatch }) {
    await userRepo.handleTwitterAuth().then(async (firebaseUser) => {
      const token = await firebaseApp.auth().currentUser.getIdToken(true)
      Cookies.set('access_token', token)
      await dispatch('setUser', firebaseUser.user)
    })
  },
  async loginWithGoogle ({ dispatch }) {
    await userRepo.handleGoogleAuth().then(async (firebaseUser) => {
      const token = await firebaseApp.auth().currentUser.getIdToken(true)
      Cookies.set('access_token', token)
      await dispatch('setUser', firebaseUser.user)
    })
  },
  async logout ({ dispatch, commit }) {
    await firebaseApp.auth().signOut()
    Cookies.remove('access_token')
    await commit('setUser', null)
    await commit('setUid', null)
    await dispatch('leads/clearLeads', null, { root: true })
  },
  async sendPasswordResetEmail ({ commit }, email) {
    await userRepo.handleSendPasswordResetEmail(email)
  },
  async changePassword ({ commit }, form) {
    const oldPassword = form.currentPassword
    const newPassword = form.newPassword

    await userRepo.handlePasswordChange(oldPassword, newPassword)
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
