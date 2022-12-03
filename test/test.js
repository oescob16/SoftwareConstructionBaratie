const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "softwareconstructionbaratie";
const FOOD_COLLECTION = "Food";
const USERS_COLLECTION = "Users";
const myId = "user_abc";
const anotherId = "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"};

function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

describe("Baratie", () =>{
    /* ---- TESTING FOOD COLLECTION ---- */
    /**
     * All food items for the menu should be read only for dispaly purposes
     * only.
     * 
     * A user should not be able to write to the Food collection.
     */

    it("Can read all food items in the Food collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection(FOOD_COLLECTION).doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })

    it("Can't write any food items in the Food collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection(FOOD_COLLECTION).doc("testDoc2");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    /* ---- TESTING USER COLLECTION ---- */
    /**
     * A user should only be able to access, read/write from/to content
     * that belongs to their user account. 
     * 
     * A user should not be able to access, read/write from/to content
     * that belongs to another user's account. 
     */

    it("Can read from a user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection(USERS_COLLECTION).doc(myId);
        await firebase.assertSucceeds(testDoc.get());
    })

    it("Can write to a user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection(USERS_COLLECTION).doc(myId);
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    })

    it("Can edit a field of an existing user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection(USERS_COLLECTION).doc(myId);
        await firebase.assertSucceeds(testDoc.set({foo: "foo"}));
    })

    it("Can't write to a user document with a different ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection(USERS_COLLECTION).doc(anotherId);
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    it("Can't read from a user document with a different ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection(USERS_COLLECTION).doc(anotherId);
        await firebase.assertFails(testDoc.get());
    })
})