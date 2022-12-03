/*
This file serves as an example for how to connect to the 
firestore database.
*/

// Setting up firebase app to use in current file
import { initializeApp } from 'firebase/app';


import {
    getFirestore,
    collection,
    getDocs,
} from 'firebase/firestore'



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

// collection ref
const colRef = collection(db, 'Users')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    console.log(snapshot.docs)
    let Users = []
    snapshot.docs.forEach(doc => {
      Users.push({ ...doc.data(), id: doc.id })
    })
    console.log(Users)
  })
  .catch(err => {
    console.log(err.message)
  })