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
    getDoc,
    connectFirestoreEmulator,
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
console.log("hello");
const db = getFirestore();
const auth = getAuth();
const colRef = collection(db, 'Users');
const userDocRef = doc(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43")
const userCartcolref = collection(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43"+"/CartItems");

var itemTable = document.getElementById("item_list")
// let cartItems = []
function cartArray(callBack) {
  onSnapshot(userCartcolref, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      addItemtoTable(doc.id, doc.data().price, doc.data().quantity)
    })
    // callBack(cartItems)
  })
}
  
function addItemtoTable(name,price,quantity){
  var tbody1 = document.getElementById("item_list");
  var trow = document.createElement("tr");
  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");

  td0.innerHTML = name;
  td1.innerHTML = price;
  td2.innerHTML = quantity;
  
  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  
  tbody1.appendChild(trow);
}
//console.log(cartItems)

// function getCartArray(callBack) {
//   let cartItems = []
//   getDocs(userCartcolref)
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         cartItems.push([doc.data().price, doc.id])
//     })
//     callBack(cartItems)
//   })
//   .catch(err => {
//     console.log(err.message)
//   });
// }

// cartArray((array) =>{
//   console.log(array)
// });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const nameOfFoolItem = "ham2";
// const priceofitem = 98;
// //   console.log(cartItems[1][3])
// const userCart = doc(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43"+"/CartItems/" + nameOfFoolItem);


// setDoc(userCart,{
//   price: priceofitem,
//   quantity: priceofitem,
//   spanishName: nameOfFoolItem,
// } )

// const newprice = "123456789"
// updateDoc(userCart, { 
//   price: newprice,
//   });


// const tranHistory = collection(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43"+"/transHistory");

// getDocs(tranHistory)
//   .then(snapshot => {
//     console.log(snapshot.docs)
//     let PrevItems = []
//     snapshot.docs.forEach(doc => {
//         PrevItems.push({ ...doc.data(), id: doc.id, price: doc.price})
//     })
//     console.log(PrevItems)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })
