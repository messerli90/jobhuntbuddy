import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_API),
  authDomain: String(process.env.FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.FIREBASE_DB_URL),
  projectId: String(process.env.FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.FIREBASE_APP_ID)
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const fireDb = firebase.firestore()

export { fireDb }
