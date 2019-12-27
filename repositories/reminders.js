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
      const reminder = { ...doc.data() }
      reminder.id = doc.id
      reminders.push(reminder)
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
    const newReminder = { ...snap.data() }
    newReminder.id = doc.id
    return newReminder
  } catch (e) {
    throw new Error(e)
  }
}

async function remove (reminder) {
  const ref = fireDb.collection('reminders/').doc(reminder.id)

  try {
    await ref.delete()
  } catch (e) {
    throw new Error(e.code)
  }
}

export {
  list,
  create,
  remove
}
