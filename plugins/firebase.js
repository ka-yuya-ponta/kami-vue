import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCQ7hrmQE8Gwbb36m_ZWGLngBMdJS2QXmk",
    authDomain: "kami-750cf.firebaseapp.com",
    projectId: "kami-750cf",
    storageBucket: "kami-750cf.appspot.com",
    messagingSenderId: "405188518875",
    appId: "1:405188518875:web:67efd4af794ebd92e8fdfe",
    measurementId: "G-56ZRQCQVSX"
    }
  )
}
  
export default firebase
