import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDF3IralvpqS0dqggjyfdPUbRbfJ2bOcQo',
  authDomain: 'job-hunt-buddy.firebaseapp.com',
  databaseURL: 'https://job-hunt-buddy.firebaseio.com',
  projectId: 'job-hunt-buddy',
  storageBucket: 'job-hunt-buddy.appspot.com',
  messagingSenderId: '455609997246',
  appId: '1:455609997246:web:dbc193c4ab01efea670bef'
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const fireDb = firebase.firestore()
const twitterAuth = new firebase.auth.TwitterAuthProvider()
const googleAuth = new firebase.auth.GoogleAuthProvider()
googleAuth.addScope('email')

export { fireDb, twitterAuth, googleAuth }
