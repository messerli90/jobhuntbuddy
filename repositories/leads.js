import { fireDb } from '~/plugins/firebase'

async function list (userId) {
  const ref = fireDb.collection(`users/${userId}/leads`)

  const leads = []
  try {
    const snap = await ref.get()
    if (snap.empty) {
      return []
    }
    snap.forEach((doc) => {
      leads.push({
        id: doc.id,
        ...doc.data()
      })
    })
  } catch (e) {
  }

  return leads
}

async function create (lead, userId) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc()

  let res
  try {
    delete lead.id
    res = await ref.set(lead)
  } catch (e) {
    // Handle Error
  }
  return res
}

async function update (lead, userId) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc(lead.id)

  let res
  try {
    res = await ref.set(lead)
  } catch (e) {
    // Handle Error
  }
  return res
}

async function remove (lead, userId) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc(lead.id)

  try {
    await ref.delete()
  } catch (e) {
    // Handle Error
  }
}

export {
  list,
  create,
  update,
  remove
}
