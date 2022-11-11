import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    onAuthStateChanged,
    updateProfile
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

const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log("auth.js: RUNNING");

function mainIfAuth(){

    displayName(auth.currentUser.Name);
    displayEmail(auth.currentUser.Email);

    var el1 = document.getElementById('editEmail');
    if(el1){
        //functionality of signing in the user after clicking log in
        el1.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                document.getElementById("editEmail").click();
            }
        })
        //functionality for user authorization
        el1.addEventListener("click", (event)=>{
            event.preventDefault();
            const email = document.getElementById("editEmailLive").value;

            editEmail(email);
        })
    }

    var el2 = document.getElementById('editName');
    if(el2){
        //functionality of signing in the user after clicking log in
        el2.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                document.getElementById("editName").click();
            }
        })
        //functionality for user authorization
        el2.addEventListener("click", (event)=>{
            event.preventDefault();
            const email = document.getElementById("editNameLive").value;

            editUsername(email);
        })
    }

    var el3 = document.getElementById('editPassword');
    if(el3){
        //functionality of signing in the user after clicking log in
        el3.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                document.getElementById("editPassword").click();
            }
        })
        //functionality for user authorization
        el3.addEventListener("click", (event)=>{
            event.preventDefault();
            const password = document.getElementById("editPasswordLive").value;

            editPassword(password);
        })
    }


}

function mainIfNotAuth(){
    document.write("You must be logged in to view this page");
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    mainIfAuth()
  } else {
    mainIfNotAuth();
  }
});

function editUsername(pAuth, newName){
    updateProfile(pAuth.currentUser, {
        Name: newName
    }).then(() => {
        console.log("Your name has been updated!");
    }).catch((error) => {
        console.log("Could not update your name!")
    });
    return;
}

function editPassword(pAuth, newPassword){
    updateProfile(pAuth.currentUser, {
        Password: newPassword
    }).then(() => {
        console.log("Your password has been updated!");
    }).catch((error) => {
        console.log("Could not update your password!")
    });
    return;
}

function editEmail(pAuth, newEmail){
    updateProfile(pAuth.currentUser, {
        Email: newEmail
    }).then(() => {
        console.log("Your password has been updated!");
    }).catch((error) => {
        console.log("Could not update your password!")
    });
    return;
}


function displayName(usersName){
    document.getElementById("displayNameHtml").innerHTML = usersName;
}

function displayEmail(usersEmail){
    document.getElementById("displayEmail").innerHTML = usersEmail;
}


