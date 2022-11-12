// -- Javascript code used by login.html mainly to verify user credentials --
// ----------------------------------------Team 6--------------------------------------------------
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBZiOp9t_Orzgm8PQlZB5QNzF9mt_CXkY4",
    authDomain: "softwareconstructionbaratie.firebaseapp.com",
    projectId: "softwareconstructionbaratie",
    storageBucket: "softwareconstructionbaratie.appspot.com",
    messagingSenderId: "298658687745",
    appId: "1:298658687745:web:b087cae08882b11f50c900",
    measurementId: "G-748VR9HX3T"
  };


//initialize app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("auth.js: RUNNING");

// Sign into account
var el2 = document.getElementById('login');
if(el2){
    //functionality of signing in the user after clicking log in
    el2.addEventListener("keypress", function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            document.getElementById("login").click();
        }
    })
    //functionality for user authorization
    el2.addEventListener("click", (event)=>{
        event.preventDefault();
        const email = document.getElementById("loginemailLive").value;
        const password = document.getElementById("loginpasswordLive").value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCred)=>{
            //Created & Signed In
            const user = userCred.user;
            console.log(user)
            document.querySelector("h4").style.display="none";
            document.querySelector("h5").style.display="none";
            document.querySelector(".popup").style.display="none";
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
        //functionality of displaying the alerts depending on user input
            if (errorCode === 'auth/wrong-password'){
                console.log('Wrong email or password, please try again.');
                document.querySelector("h4").style.display="none";
                document.querySelector("h5").style.display="flex";
            } else{
                console.log('Wrong password, please try again.');
                document.querySelector("h5").style.display="none";
                document.querySelector("h4").style.display="flex";
            }
        })
    })
}
//Sign out functionality
var el3 = document.getElementById('logoutBtn');
el3.addEventListener('click', (event)=>{
    event.preventDefault();
    signOut(auth)
    .then(()=>{
        console.log("Signed Out")
    })
    .catch((err)=>{
        console.log(err)
    })
})
//Admin asign out button
var el4 = document.getElementById('adminlogoutBtn');
el4.addEventListener('click', (event)=>{
    event.preventDefault();
    signOut(auth)
    .then(()=>{
        console.log("Signed Out")
    })
    .catch((err)=>{
        console.log(err)
    })
})

//Current State
onAuthStateChanged(auth, (user)=>{
    if(user){
        //User is signed in
        const uid = user.uid;
        console.log(user);
        console.log(uid);
        
    }else{
        //User is signed out
        console.log(user);
    }
})
//monitors any change in the users status, log in , registration, log out
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user =>{
        if (user) {
            user.getIdTokenResult()
            .then(idTokenResult =>{
                console.log(idTokenResult.claims['role'])
                //if statement to check if user is a customer
                if(idTokenResult.claims['role'] == 'user'){
                    //display = "none" ===> hides all items using none
                    genItems.forEach(item=> item.style.display = "none")
                    //display = "block" ===> displays all items using none
                    customItems.forEach(item=> item.style.display = "block")
                    adminItems.forEach(item=> item.style.display = "none")
                    
                }
                //else statement for admin items
                else if(idTokenResult.claims['role'] == 'admin'){
                    genItems.forEach(item=> item.style.display = "none")
                    customItems.forEach(item=> item.style.display = "none")
                    adminItems.forEach(item=> item.style.display = "block")
                }
            })
            console.log("logged in")
        }
        else{
            //else statement to display for general public
            genItems.forEach(item=> item.style.display = "block")
            customItems.forEach(item=> item.style.display = "none")
            adminItems.forEach(item=> item.style.display = "none")
        }
    })
}
monitorAuthState();