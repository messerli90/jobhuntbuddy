import { fireDb } from '~/plugins/firebase'

async function list (userId) {
  const ref = fireDb.collection(`users/${userId}/leads`)

  const leads = []
  try {
    const snap = await ref.orderBy('createdAt').get()
    if (snap.empty) {
      return []
    }
    snap.forEach((doc) => {
      const lead = { ...doc.data() }
      lead.id = doc.id
      leads.push(lead)
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
    lead = { ...snap.data() }
    lead.id = snap.id
  } catch (e) {
    throw new Error(e.code)
  }
  return lead
}

async function create (userId, lead) {
  const ref = fireDb.collection(`users/${userId}/leads`).doc()
  let doc
  try {
    lead.createdAt = new Date()
    await ref.set(lead)
    doc = await ref.get()
  } catch (e) {
    throw new Error(e.code)
  }
  const newLead = { ...doc.data() }
  newLead.id = doc.id

  return newLead
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
  const newLead = { ...doc.data() }
  newLead.id = doc.id

  return newLead
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
