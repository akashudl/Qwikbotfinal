import firebase from 'firebase/app';
import  'firebase/auth';
import  'firebase/firestore';

  // Your web app's Firebase configuration
  export const firebaseConfig = {
    apiKey: "AIzaSyBpSRGGM7yLWedZ_CjtPkIucb3EnTRAAGY",
    authDomain: "auth-development-9c261.firebaseapp.com",
    databaseURL: "https://auth-development-9c261-default-rtdb.firebaseio.com",
    projectId: "auth-development-9c261",
    storageBucket: "auth-development-9c261.appspot.com",
    messagingSenderId: "755209617304",
    appId: "1:755209617304:web:f1224a9c20b8ff3dc635ed"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  
  export const auth=firebase.auth()
  export const db=firebase.firestore();
  

  export default firebase;