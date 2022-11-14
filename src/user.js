
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import {
    getFirestore,
    collection,
    doc,
    getDoc,
    onSnapshot,
    getDocs,
    DocumentSnapshot,
    setDoc,
} from 'firebase/firestore'

import {
    getAuth,
    onAuthStateChanged,
    updateCurrentUser,
    updateProfile,
    updateEmail
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

initializeApp(firebaseConfig);

//Initialize Services
const auth = getAuth();
const db = getFirestore();
const usersRef = collection(db, "Users");

console.log("auth.js: RUNNING");

onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserData(user)
        updateUserData(user);
    } else {
        mainIfNotAuth();
    }
});

function updateUserData(user){

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
            const newEmail = document.getElementById("editEmailLive").value;

            console.log("The email you entered: ", newEmail);

            updateEmail(auth.currentUser, newEmail).then(() => {
                db.collection("Users").doc(user.uid).update({email: newEmail});
                console.log("Your name has been updated!");
            }).catch((error) => {
                console.log("Could not update your name!")
            });
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
            const newName = document.getElementById("editNameLive").value;

            console.log("Tried to update name to ", newName);

            updateProfile(auth.currentUser, {
                Name: newName
            }).then(() => {
                db.collection("Users").doc(user.uid).update({Name: newName});
                console.log("Your name has been updated!");
            }).catch((error) => {
                console.log("Could not update your name!")
            });
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

            editPassword(user, password);
        })
    }


}

function mainIfNotAuth(){
    document.write("<a href='"+"mainPage.html"+"'>Mainpage</a>");
}

function editUsername(pAuth, newName){
    updateProfile(auth.currentUser, {
        Name: newName
    }).then(() => {
        db.collection("Users").doc(pAuth.uid).update({Name: newName});
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
        console.log("Your Email has been updated!");
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

function displayUserData(user){
    getDocs(usersRef).then(snapshot => {//
        console.log(snapshot.docs)
        snapshot.docs.forEach(
            function(ChildSnapshot){
                let name = ChildSnapshot.id;
                let userName = ChildSnapshot.get('Name');
                let userEmail = ChildSnapshot.get('email');
                if(user.email == userEmail){
                    displayName(userName);
                    displayEmail(userEmail)
                }
            }
        );
    }).catch(err => {
        console.log(err.message)
    })
}



