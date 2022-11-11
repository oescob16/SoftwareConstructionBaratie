import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    updateDoc,
    onSnapshot,
    doc,
} from 'firebase/firestore'

import {
    createUserWithEmailAndPassword,
    getAuth, 
    onAuthStateChanged
} from 'firebase/auth';

//import { firebaseConfig } from "./firebaseConfig.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZiOp9t_Orzgm8PQlZB5QNzF9mt_CXkY4",
    authDomain: "softwareconstructionbaratie.firebaseapp.com",
    projectId: "softwareconstructionbaratie",
    storageBucket: "softwareconstructionbaratie.appspot.com",
    messagingSenderId: "298658687745",
    appId: "1:298658687745:web:b087cae08882b11f50c900",
    measurementId: "G-748VR9HX3T"
  };

//init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth();
const colRef = collection(db, 'Users')

getDocs(colRef)
  .then(snapshot => {
    console.log(snapshot.docs)
    let users = []
    snapshot.docs.forEach(doc => {
      Users.push({ ...doc.data(), id: doc.id })
    })
    console.log(users)
  })
  .catch(err => {
    console.log(err.message)
  })


  console.log("Hello World")