import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'


//Get this code from firebase website
const firebaseApp = initializeApp ({

    apiKey: "AIzaSyBStzdfmo7wXg7tA6I2jtSR_76cbM9FVTs",

    authDomain: "chat-app-df01f.firebaseapp.com",
  
    projectId: "chat-app-df01f",
  
    storageBucket: "chat-app-df01f.appspot.com",
  
    messagingSenderId: "617360411800",
  
    appId: "1:617360411800:web:b55366eca5db7ec58694ed",
  
    measurementId: "G-3L6LYJYBRY"

})

//initialize database
const db = getFirestore();
const provider = new GoogleAuthProvider()

export { db, provider }