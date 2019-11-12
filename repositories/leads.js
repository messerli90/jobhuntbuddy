import { fireDb } from '~/plugins/firebase'

async function list () {
  const ref = fireDb.collection('leads')

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

async function store (lead) {
  const ref = fireDb.collection('leads').doc(lead.id)

  let res
  try {
    delete lead.id
    res = await ref.set(lead)
  } catch (e) {
    // Handle Error
  }
  return res
}

async function remove (lead) {
  const ref = fireDb.collection('leads').doc(lead.id)

  try {
    await ref.delete()
  } catch (e) {
    // Handle Error
  }
}

export {
  list,
  store,
  remove
}
