import { fireDb } from '~/plugins/firebase'

async function list (userId) {
  const ref = fireDb.collection('reminders').where('userId', '==', userId)

  const reminders = []
  try {
    const snap = await ref.orderBy('dateTime', 'desc').get()
    if (snap.empty) {
      return []
    }
    snap.forEach((doc) => {
      reminders.push(doc.data())
    })
  } catch (e) {
    throw new Error(e)
  }

  return reminders
}

async function create (reminder) {
  const ref = fireDb.collection('reminders')
  try {
    reminder.createdAt = new Date()
    const doc = await ref.add(reminder)
    const snap = await doc.get()
    return snap.data()
  } catch (e) {
    throw new Error(e)
  }
}

export {
  list,
  create
}
