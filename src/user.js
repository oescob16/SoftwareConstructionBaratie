
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import {
    getFirestore,
    collection,
    doc,
    getDoc,
    onSnapshot,
} from 'firebase/firestore'

import {
    getAuth,
    onAuthStateChanged,
    updateCurrentUser,
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

initializeApp(firebaseConfig);

//Initialize Services
const auth = getAuth();
const db = getFirestore();
const usersRef = collection(db, "Users");

console.log("auth.js: RUNNING");

onAuthStateChanged(auth, (user) => {
    if (user) {
        var userDetails;

        var name, email;

        const docRef = doc(db, "Users", user.uid.toString());
        onSnapshot(docRef, (doc) => {
            console.log(doc.data(), doc.id);
            name = doc.data().toString();
        })

        document.write(name);

        if(docRef.exists()){
            console.log(docRef.data());
            mainIfAuth()
        } else {
            mainIfNotAuth();
        }
    } else {
        mainIfNotAuth();
    }
});

async function documentGetter(){
    return await getDoc(doc(db, 'Users', user.uid));
}

function mainIfAuth(){

    displayName(auth.currentUser.Name);
    displayEmail(auth.currentUser.email);

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
    document.write("<a href='"+"mainPage.html"+"'>Mainpage</a>");
}

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

class User {

    constructor (Name, email, password) {
        this.Name = Name;
        this.email = email;
        this.password = password;
    }

    userConverter = {
        toFirestore: (user) => {
            return {
                Name : user.Name,
                email : user.email,
                password : user.password
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new User(data.Name, data.email, data.password);
        }
    }
}


