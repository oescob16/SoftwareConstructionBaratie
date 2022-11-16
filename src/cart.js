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
    deleteDoc,
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


onAuthStateChanged(auth, (user) => {
  if (user !== null) {
      console.log("Current userID (uid):", user.uid);
      console.log("Welcome", user.email)
      const colRef = collection(db, 'Users');

      const userDocRef = doc(db,"Users/"+user.uid)
      const userCartcolref = collection(db,"Users/"+user.uid+"/CartItems");

      // var itemTable = document.getElementById("item_list")
      // var button = document.getElementById("plus1")
      // let cartItems = []
      // function alterTotal() {
      //   let total_expense = getElementById("total");
      //   cartArray((array) => {
      //     let sum = 0;
      //     array.forEach(element => {
      //       sum = sum + element[1];
      //     });
      //     total_expense.innerHTML = "Total: " + sum;
      //   })
      // }

      function cartArray(callBack) {
        let cartItems = []
        onSnapshot(userCartcolref, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            cartItems.push([doc.id, doc.data().price, doc.data().quantity]);
          })
          callBack(cartItems)
        })

        console.log("cartArray")
      }

        onSnapshot(userCartcolref, (snapshot) => {
          snapshot.docs.forEach((doc,index) => { 
            addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
          })

          console.log("onSnapShot")
        })

      // function load(){
      //   onSnapshot(userCartcolref, (snapshot) => {
      //     snapshot.docs.forEach((doc,index) => { 
      //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
      //     })

      //     console.log("onSnapShot")
      //   })
      // }


      const plus_val = "+";
      const minus_val = "-";
      const del_val = 'Remove';
      const total = document.getElementById("total");
      
      changeTotal();

      function changeTotal() {
        cartArray((array) => {
          let count = 0;
          for(var i = 0; i < array.length; i++) {
            count += (array[i][1]*array[i][2]);
          }
          total.innerHTML = "<b> Total: </b> $"+count;
        })
      }

      function incrementQuantity(event) {
        const clicked = event.target;
        cartArray((array) =>{
          console.log(array[clicked.id])
          const cart_item = doc(db,"Users/"+user.uid+"/CartItems/"+array[clicked.id][0]);
          var tbody = document.getElementById("item_list");
          tbody.innerHTML = '';
          total.innerHTML = '';
          updateDoc(cart_item, {
            quantity: array[clicked.id][2] + 1
          })
          .then(()=>{
            location.reload();
          })
          // getDocs(userCartcolref)
          //   .then(snapshot => {
          //      snapshot.docs.forEach((doc,index) => {
          //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
          //      })
          //    })
        });
      }
      
      function decrementQuantity(event) {
        const clicked = event.target;
        cartArray((array) =>{
          console.log(array[clicked.id-1])
          const cart_item = doc(db,"Users/"+user.uid+"/CartItems/"+array[clicked.id-1][0]);
          var tbody = document.getElementById("item_list");
          tbody.innerHTML = '';
          total.innerHTML = '';
          updateDoc(cart_item, {
            quantity: array[clicked.id-1][2] - 1
          })
          .then(()=>{
            location.reload();
          })
          // getDocs(userCartcolref)
          //   .then(snapshot => {
          //      snapshot.docs.forEach((doc,index) => {
          //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
          //      })
          //    })
        });
      }

      function deleteItem(event) {
        const clicked = event.target;
        const id_d = parseInt(clicked.id.charAt(1));
        cartArray((array) =>{
          // alert(array[id_d][0]);
          //console.log(array[clicked.id-1])
          const cart_item = doc(db,"Users/"+user.uid+"/CartItems/"+array[id_d][0]);
          var tbody = document.getElementById("item_list");
          tbody.innerHTML = '';
          total.innerHTML = '';
          deleteDoc(cart_item)
          .then(()=>{
            location.reload();
          })
          // getDocs(userCartcolref)
          //   .then(snapshot => {
          //      snapshot.docs.forEach((doc,index) => {
          //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
          //      })
          //    })
        });
      }

      function addItemtoTable(name,price,quantity,index){
        var tbody1 = document.getElementById("item_list");
        
        var trow = document.createElement("tr");
        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var plus = document.createElement("button");
        var min = document.createElement("button");
        var del = document.createElement("button");
        var br = document.createTextNode('-');
        plus.id = index;
        min.id = index+1;
        del.id = "d"+index;

        td0.innerHTML = name;
        td1.innerHTML = "$"+price;
       
        plus.innerHTML = plus_val;
        plus.onclick = incrementQuantity;
        td2.innerHTML = quantity;
        min.innerHTML = minus_val;
        min.onclick = decrementQuantity;
        del.innerHTML = del_val;
        del.onclick = deleteItem;

        trow.appendChild(td0);
        trow.appendChild(td1);
        
        trow.appendChild(plus);
        trow.appendChild(td2);
        trow.appendChild(min);
        trow.appendChild(br);
        trow.appendChild(del);
        tbody1.appendChild(trow);
        console.log("addItemtoTable")
      }
  }
  else {
      console.log("No current user signed in! Please sign in.");
  }
})




// const colRef = collection(db, 'Users');
// console.log(auth.currentUser);
// const currUser = auth.currentUser;
// console.log(currUser);
// const userDocRef = doc(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43")
// const userCartcolref = collection(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43"+"/CartItems");

// // var itemTable = document.getElementById("item_list")
// // var button = document.getElementById("plus1")
// // let cartItems = []



// function cartArray(callBack) {
//   let cartItems = []
//   onSnapshot(userCartcolref, (snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       cartItems.push([doc.id, doc.data().price, doc.data().quantity]);
//     })
//     callBack(cartItems)
//   })

//   console.log("cartArray")
// }

//   onSnapshot(userCartcolref, (snapshot) => {
//     snapshot.docs.forEach((doc,index) => { 
//       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
//     })

//     console.log("onSnapShot")
//   })

// // function load(){
// //   onSnapshot(userCartcolref, (snapshot) => {
// //     snapshot.docs.forEach((doc,index) => { 
// //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
// //     })

// //     console.log("onSnapShot")
// //   })
// // }


// const plus_val = "+";
// const minus_val = "-";
// //var plus = document.createElement("button");
// //var minus = document.createElement("button");

// function incrementQuantity(event) {
//   const clicked = event.target;
//   console.log("0000000000000000000")
//   cartArray((array) =>{
//     console.log(array[clicked.id])
//     console.log("11111111111111111")
//     const cart_item = doc(db,"Users/"+"e1WRimGxuINs1hKIUqLVeaJZEw43"+"/CartItems/"+array[clicked.id][0]);
//     console.log("222222222222222222")
//     var tbody = document.getElementById("item_list");
//     tbody.innerHTML = '';
//     console.log("3333333333333333333")
//     updateDoc(cart_item, {
//       quantity: array[clicked.id][2] + 1
//     })
//     .then(()=>{
//       location.reload();
//     })
//     // getDocs(userCartcolref)
//     //   .then(snapshot => {
//     //      snapshot.docs.forEach((doc,index) => {
//     //       addItemtoTable(doc.id, doc.data().price, doc.data().quantity,index)
//     //      })
//     //    })
//   });
// }

// function addItemtoTable(name,price,quantity,index){
//   var tbody1 = document.getElementById("item_list");
  
//   var trow = document.createElement("tr");
//   var td0 = document.createElement("td");
//   var td1 = document.createElement("td");
//   var td2 = document.createElement("td");
//   var plus = document.createElement("button");
//   plus.id = index;

//   //minus.id = index;
  
//   td0.innerHTML = name;
//   td1.innerHTML = price;
//   td2.innerHTML = quantity;
//   plus.innerHTML = plus_val;
//   plus.onclick = incrementQuantity;
//   // minus.innerHTML = minus_val;
//   trow.appendChild(td0);
//   trow.appendChild(td1);
//   trow.appendChild(td2);
//   trow.appendChild(plus);
//   tbody1.appendChild(trow);
//   console.log("addItemtoTable")
// }


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
