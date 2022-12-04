// Setting up firebase app to use in current file
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
} from 'firebase/firestore';

import {
    getAuth, 
    onAuthStateChanged
} from 'firebase/auth';
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

//init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'Food');

function addItemsToMenu(name, description, image, price, type){
    let ulAppetizers = document.getElementById('menu-list-appetizers');
    let ulEntrees = document.getElementById('menu-list-entrees');
    let ulDrinks = document.getElementById('menu-list-drinks');
    let ulDesserts = document.getElementById('menu-list-desserts');

    let box = document.createElement('div');
    box.className = "box";

    let content = document.createElement('div');
    content.className = "content";
    
    let _name = document.createElement('h3');
    let _description = document.createElement('p');
    let _image = document.createElement('img');
    let _price = document.createElement('p');
    let _button = document.createElement('input');
    _button.className = "add-to-cart-btn";
    _button.type = "button";
    _button.value = "Add to Cart";
    _button.onclick = () => addToCart(name, price);
    
    _name.innerHTML = name;
    _description.innerHTML = description;
    _image.src = image;
    _image.alt = "";
    _price.innerHTML = '$'+price;

    box.appendChild(_image);
    box.appendChild(content);
    content.appendChild(_name);
    content.appendChild(_description);
    content.appendChild(_price);
    content.appendChild(_button);

    switch (type) {
        case "Appetizer":
            ulAppetizers.appendChild(box);
            break;
        case "Entree":
            ulEntrees.appendChild(box);
            break;
        case "Drink":
            ulDrinks.appendChild(box);
            break;
        case "Dessert":
            ulDesserts.appendChild(box);
            break;
        default:
            break;
    }
}

function fetchAllData() {
    // get collection data
    getDocs(colRef).then(snapshot => {//
        console.log(snapshot.docs)
        let Menu = []
        snapshot.docs.forEach(
            function(ChildSnapshot){
                let name = ChildSnapshot.id;
                let description = ChildSnapshot.get('Description');
                let image = ChildSnapshot.get('Image');
                let price = ChildSnapshot.get('Price');
                let type = ChildSnapshot.get('Type');
                addItemsToMenu(name, description, image, price, type);
            }
        );
        console.log(Menu)
    }).catch(err => {
        console.log(err.message)
    })
}

window.onload(fetchAllData());

function addToCart(itemName, itemPrice){
    onAuthStateChanged(auth, (user) =>{
        message("Added to cart", "", "success", false)
        console.log("Current userID (uid):", user.uid);
        const userCart = doc(db,"Users/"+user.uid+"/CartItems/" + itemName);
        let itemQuantity = 1;
        setDoc(userCart,{
            price: itemPrice,
            name: itemName,
            quantity: itemQuantity,
        })
    })
};

module.exports = addItemsToMenu;
