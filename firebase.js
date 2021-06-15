import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBi3sPQRLlWsbw5hYS4Sb4o-5Hv7EvnpP0",
    authDomain: 'h5bc062020.firebaseapp.com',
    projectId: "h5bc062020",
    storageBucket: "h5bc062020.appspot.com",
    messagingSenderId: "1070156207024",
    appId: "1:1070156207024:web:e1edd6e2ab7983d48e7c75",
})

export const auth = app.auth()
export const db = app.firestore()
export const functions = app.functions()
export default app