// -- Javascript code used by login.html mainly to verify user credentials --
// ----------------------------------------Team 6--------------------------------------------------
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import { message } from './alert'

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

        setPersistence(auth, browserLocalPersistence)
            .then( () => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCred)=>{
                        //Created & Signed In
                        const user = userCred.user;

                        let elemLogin = document.getElementById("myBtn")
                        let elemLogout = document.getElementById("logoutBtn")
                        let elemSignUp= document.getElementById("signUp")
                        let elemUserPage= document.getElementById("userPage")

                        elemLogin.setAttribute("hidden", "hidden")
                        elemLogout.removeAttribute("hidden")
                        elemUserPage.removeAttribute("hidden")
                        elemSignUp.setAttribute("hidden", "hidden")

                        message("Successfully Signed In", "Welcome " + user.email, "success", false)

                    })
                    .catch((error)=>{
                        var errorCode = error.code;
                        //functionality of displaying the alerts depending on user input
                        if (errorCode === 'auth/wrong-password'){
                            message("Wrong Password", "Try again!", "error", true)
                        } else if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
                            message("Wrong Email", "Try again!", "error", true)
                        }
                    })
            })
    })
}
//Sign out functionality
var el3 = document.getElementById('logoutBtn');
el3.addEventListener('click', (event)=>{
    event.preventDefault();
    signOut(auth)
    .then(()=>{

        message("Successfully Signed Out", "Good-bye!", "success", false)

        let elemLogin = document.getElementById("myBtn")
        let elemLogout = document.getElementById("logoutBtn")
        let elemSignUp= document.getElementById("signUp")
        let elemUserPage= document.getElementById("userPage")

        elemLogin.removeAttribute("hidden")
        elemLogout.setAttribute("hidden", "hidden")
        elemUserPage.setAttribute("hidden", "hidden")
        elemSignUp.removeAttribute("hidden")
    })
    .catch((err)=>{
        message("An error occured", err, "error", true)
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
            console.log("logged in")
        }
        else{
            //else statement to display for general public
            console.log("sign out")
        }
    })
}
monitorAuthState();