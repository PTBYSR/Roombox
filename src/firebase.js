import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbQDu0jJIAdn6oZYd3ZWd64EVZBOxUC3o",
    authDomain: "whatsapp-mern-70ae7.firebaseapp.com",
    projectId: "whatsapp-mern-70ae7",
    storageBucket: "whatsapp-mern-70ae7.appspot.com",
    messagingSenderId: "651740775351",
    appId: "1:651740775351:web:11bdda75061408e2511e32",
    measurementId: "G-7QM0DLTMWC"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;