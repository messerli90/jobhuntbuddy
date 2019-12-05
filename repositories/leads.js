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

async function show (userId, leadId) {
  const ref = fireDb.doc(`users/${userId}/leads/${leadId}`)
  let lead
  try {
    const snap = await ref.get()
    lead = {
      id: snap.id,
      ...snap.data
    }
  } catch (e) {}
  return lead
}

async function create (userId, lead) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc()
  let doc
  try {
    const newLead = {
      ...lead,
      createdAt: new Date()
    }
    await ref.set(newLead)
    doc = await ref.get()
  } catch (e) {
    throw new Error(e.code)
  }
  return {
    id: doc.id,
    ...doc.data
  }
}

async function update (userId, lead) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc(lead.id)

  let doc
  try {
    await ref.set(lead)
    doc = await ref.get()
  } catch (e) {
    throw new Error(e.code)
  }
  return {
    id: doc.id,
    ...doc.data
  }
}

async function remove (userId, lead) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc(lead.id)

  try {
    await ref.delete()
  } catch (e) {
    throw new Error(e.code)
  }
}

export {
  list,
  create,
  update,
  remove,
  show
}
