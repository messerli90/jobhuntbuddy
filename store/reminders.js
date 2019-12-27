import * as FireStore from '~/repositories/reminders'

export const state = () => ({
  reminders: []
})

export const getters = {
  getAllReminders: (state) => {
    return state.reminders.sort(function (a, b) {
      const unixA = a.dateTime ? a.dateTime.seconds : '9999999999'
      const unixB = b.dateTime ? b.dateTime.seconds : '9999999999'
      return unixA < unixB ? -1 : 1
    })
  },
  getRemindersByLead: state => (leadId) => {
    const filtered = state.reminders.filter((r) => {
      return r.leadId === leadId
    })
    const sorted = filtered.sort(function (a, b) {
      const unixA = a.dateTime ? a.dateTime.seconds : '9999999999'
      const unixB = b.dateTime ? b.dateTime.seconds : '9999999999'
      return unixA < unixB ? -1 : 1
    })
    return sorted
  }
}

export const mutations = {
  setReminders (state, reminders) { state.reminders = reminders },
  addReminder (state, reminder) { state.reminders.push(reminder) }
}

export const actions = {
  async fetchAllReminders ({ commit, rootState }) {
    const userId = await rootState.users.uid
    const reminders = await FireStore.list(userId)
    await commit('setReminders', reminders)
  },
  async createReminder ({ commit, rootState }, reminder) {
    const userId = await rootState.users.uid
    reminder.userId = userId
    const newReminder = await FireStore.create(reminder)
    await commit('addReminder', newReminder)
  }
}
