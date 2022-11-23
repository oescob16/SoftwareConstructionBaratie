
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
    updateDoc,
    setDoc,
    waitForPendingWrites,
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
            
            editEmail(user, newEmail);
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

            editUsername(user, newName);
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
    window.location.href = "mainPage.html";
}

function editUsername(pAuth, newName){
    updateProfile(auth.currentUser, {
        Name: newName
    }).then(() => {
        console.log("Your name has been updated!");
        editUsernameInFirebase(pAuth, newName);
    }).catch((error) => {
        console.log("Could not update your name!")
        console.log(error);
    });
    return;
}

async function editUsernameInFirebase(pAuth, newName){
    let userData = getUserData(pAuth);
    await updateDoc(doc(db, 'Users', pAuth.uid), {
        Name: newName
    });
}

function editPassword(pAuth, newPassword){
    updateProfile(pAuth.currentUser, {
        Password: newPassword
    }).then(() => {
        console.log("Your password has been updated!");
        editPasswordInFirebase(pAuth, newPassword);
    }).catch((error) => {
        console.log("Could not update your password!");
        console.log(error);
    });
    return;
}

async function editPasswordInFirebase(pAuth, newPassword){
    let userData = getUserData(pAuth);
    await updateDoc(doc(db, 'Users', pAuth.uid), {
        password: newPassword
    });
}

function editEmail(pAuth, newEmail){
    editEmailInFirebase(newEmail);
    updateProfile(pAuth.currentUser, {
        Email: newEmail
    }).then(() => {
        console.log("Your Email has been updated!");
    }).catch((error) => {
        console.log("Could not update your password!");
        console.log(error);
    });
    return;
}

async function editEmailInFirebase(pAuth, newEmail){
    let userData = getUserData(pAuth);
    await updateDoc(doc(db, 'Users', pAuth.uid), {
        email: newEmail
    });
}

function displayName(usersName){
    document.getElementById("displayNameHtml").innerHTML = usersName;
}

function displayEmail(usersEmail){
    document.getElementById("displayEmail").innerHTML = usersEmail;
}

function displayUserData(user){
    getDocs(usersRef).then(snapshot => {
        console.log(snapshot.docs)
        snapshot.docs.forEach(
            function(ChildSnapshot){
                let name = ChildSnapshot.id;
                let userName = ChildSnapshot.get('Name');
                let userEmail = ChildSnapshot.get('email');
                let userPassword = ChildSnapshot.get('password');
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

function getUserData(user){
    let userDetails = [];
    getDocs(usersRef).then(snapshot => {//
        console.log(snapshot.docs)
        snapshot.docs.forEach(
            function(ChildSnapshot){
                let name = ChildSnapshot.id;
                let userName = ChildSnapshot.get('Name');
                let userEmail = ChildSnapshot.get('email');
                let userPassword = ChildSnapshot.get('password');
                if(user.email == userEmail){
                    userDetails['password'] = userPassword;
                    userDetails['email'] = userEmail;
                    userDetails['name'] = userName;
                }
            }
        );
    }).catch(err => {
        console.log(err.message)
    })
    return userDetails;
}



