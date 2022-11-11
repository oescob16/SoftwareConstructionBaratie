import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged
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
const auth = getAuth(app);

var modal = document.getElementById("myModal");
    
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var logoutBtn = document.getElementById("logoutBtn")
var signupBtn = document.getElementById("signUp")
var userPageBtn = document.getElementById("userPage")

//Current State
onAuthStateChanged(auth, (user)=>{
  if(user){ // user is signed in
    btn.setAttribute("hidden", "hidden")
    logoutBtn.removeAttribute("hidden")
    userPageBtn.removeAttribute("hidden")
    signupBtn.setAttribute("hidden", "hidden")
  } else { // user is signed out
    logoutBtn.setAttribute("hidden", "hidden")
    userPageBtn.setAttribute("hidden", "hidden")
    signupBtn.removeAttribute("hidden")
    btn.removeAttribute("hidden")
  }
})

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}