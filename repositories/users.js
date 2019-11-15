import firebaseApp, { fireDb } from '~/plugins/firebase'

/**
 * Handle new user registration using Email/Password
 *
 * @param {String} email
 * @param {String} password
 *
 * @returns {firebase.auth.UserCredential} firebaseUser
 */
async function registerWithEmailPassword (email, password) {
  const firebaseUser = await createUserWithEmailPassword(email, password)
  writeUserToFirestore(firebaseUser)
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
async function createUserWithEmailPassword (email, password) {
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
 */
function writeUserToFirestore (firebaseUser) {
  const ref = fireDb.collection('users').doc(firebaseUser.user.uid)
  ref.set({
    email: firebaseUser.user.email
  }).catch((e) => {
    throw new Error(e.message)
  })
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

export {
  registerWithEmailPassword,
  loginWithEmailPassword
}
