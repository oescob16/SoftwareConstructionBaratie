//  The loginFunctions class has methods used by mainly by the popups in index.html. Additionaly, they allow the website to be dynamic
// ----------------------------------------Team 6--------------------------------------------------
import { AuthErrorCodes } from 'firebase/auth';

// Show the login popup when the home button is clicked
var el1 = document.getElementById('homeBtn');
if(el1){
  el1.addEventListener("click",function(){
    document.querySelector(".popup").style.display="flex";
})
}
// Hide the login popup when the close button is clicked 
var el2 = document.getElementById('closeBtn');
if(el2){
  el2.addEventListener("click",function(){
    document.querySelector(".popup").style.display="none";
})
}