import firebase from 'firebase/app'
import firebaseApp, { fireDb, twitterAuth, googleAuth } from '~/plugins/firebase'

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
    .catch((error) => {
      const errorMessage = error.message
      const errorCode = error.code
      if (errorCode === 'auth/account-exists-with-different-credential') {
        throw new Error('Looks like you already have an account, but signed up with a different provider, or you used email/password to create your account.')
      } else {
        throw new Error(errorMessage)
      }
    })
  _writeUserToFirestore(firebaseUser)
  return firebaseUser
}

async function handleGoogleAuth () {
  const firebaseUser = await firebaseApp.auth().signInWithPopup(googleAuth)
    .catch((error) => {
      const errorMessage = error.message
      const errorCode = error.code
      if (errorCode === 'auth/account-exists-with-different-credential') {
        throw new Error('Looks like you already have an account, but signed up with a different provider, or you used email/password to create your account.')
      } else {
        throw new Error(errorMessage)
      }
    })
  _writeUserToFirestore(firebaseUser)
  return firebaseUser
}

/**
 * Reset user password
 *
 * @param {String} oldPassword
 * @param {String} newPassword
 */
async function handlePasswordChange (oldPassword, newPassword) {
  const firebaseUser = firebaseApp.auth().currentUser
  await _handleReauthenticateWithCredential(firebaseUser, oldPassword)

  firebaseUser.updatePassword(newPassword)
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        throw new Error(error.message)
      }
    })
}

/**
 * Re-authenticates a user using a fresh credential.
 *
 * @param {firebase.auth.currentUser} firebaseUser
 * @param {String} password
 */
async function _handleReauthenticateWithCredential (firebaseUser, password) {
  const email = firebaseUser.email
  const userCredential = firebase.auth.EmailAuthProvider.credential(email, password)
  await firebaseUser.reauthenticateWithCredential(userCredential).catch((error) => {
    throw new Error(error.message)
  })
}

export {
  registerWithEmailPassword,
  loginWithEmailPassword,
  handleSendPasswordResetEmail,
  handleTwitterAuth,
  handleGoogleAuth,
  handlePasswordChange
}
