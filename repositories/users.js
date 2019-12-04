import firebaseApp, { fireDb, twitterAuth } from '~/plugins/firebase'

/**
 * Handle new user registration using Email/Password
 *
 * @param {Object} form
 *
 * @returns {firebase.auth.UserCredential} firebaseUser
 */
async function registerWithEmailPassword (form) {
  const email = form.email
  const password = form.password
  const name = form.name
  const firebaseUser = await _createUserWithEmailPassword(email, password)
  await _updateFirebaseUserName(firebaseUser, name)
  _writeUserToFirestore(firebaseUser)
  return firebaseUser
}

/**
 * Registers a new user on Firebase
 *
 * @param {String} email
 * @param {Sring} password
 *
 * @returns Promise<firebase.auth.UserCredential>
 */
async function _createUserWithEmailPassword (email, password) {
  const firebaseUser = await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorMessage = error.message
      throw new Error(errorMessage)
    })
  return firebaseUser
}

/**
 * Updates user record on Firestore
 *
 * @param {firebase.auth.UserCredential} firebaseUser
 * @param {String} name
 */
function _writeUserToFirestore (firebaseUser) {
  const ref = fireDb.collection('users').doc(firebaseUser.user.uid)
  ref.set({
    displayName: firebaseUser.user.displayName,
    email: firebaseUser.user.email
  }).catch((e) => {
    throw new Error(e.message)
  })
}

/**
 * Updates a user's display name on UserCredential
 * ( Does not update Firestore reference )
 *
 * @param {firebase.auth.UserCredential} firebaseUser
 * @param {String} name
 */
async function _updateFirebaseUserName (firebaseUser, name) {
  const user = firebaseUser.user
  await user.updateProfile({
    displayName: name
  }).catch((e) => {
    throw new Error(e.message)
  })
  return user
}

/**
 * Authenticate user with Email/Password
 *
 * @param {String} email
 * @param {String} password
 *
 * @returns firebase.auth.UserCredential
 */
async function loginWithEmailPassword (email, password) {
  const firebaseUser = await firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorMessage = error.message
      const errorCode = error.code
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        throw new Error('The email/password combination is invalid.')
      } else {
        throw new Error(errorMessage)
      }
    })
  return firebaseUser
}

/**
 * Send a password reset email to given email address
 *
 * @param {String} email
 */
async function handleSendPasswordResetEmail (email) {
  const auth = firebaseApp.auth()

  try {
    await auth.sendPasswordResetEmail(email)
  } catch (e) {
    throw new Error(e.message)
  }
}

async function handleTwitterAuth () {
  const firebaseUser = await firebaseApp.auth().signInWithPopup(twitterAuth)
    .catch((e) => {
      throw new Error(e.message)
    })
  // await _updateFirebaseUserName(firebaseUser, name)
  _writeUserToFirestore(firebaseUser)
  return firebaseUser
}

export {
  registerWithEmailPassword,
  loginWithEmailPassword,
  handleSendPasswordResetEmail,
  handleTwitterAuth
}
