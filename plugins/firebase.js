import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: String(process.env.fireApiKey),
  authDomain: String(process.env.fireAuthDomain),
  databaseURL: String(process.env.fireDatabaseUrl),
  projectId: String(process.env.fireProjectId),
  storageBucket: String(process.env.fireStorageBucket),
  messagingSenderId: String(process.env.fireMessagingSenderId),
  appId: String(process.env.fireAppId)
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const fireDb = firebase.firestore()
const twitterAuth = new firebase.auth.TwitterAuthProvider()
const googleAuth = new firebase.auth.GoogleAuthProvider()
googleAuth.addScope('email')

export { fireDb, twitterAuth, googleAuth }
