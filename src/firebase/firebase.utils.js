import firebase from 'firebase/app';

import 'firebase/firestore';
import'firebase/auth';


const config = {
    apiKey: "AIzaSyCUipBP629NR_LrXOywHL23v-PQPA9T_Mo",
    authDomain: "crown-db-f9415.firebaseapp.com",
    projectId: "crown-db-f9415",
    storageBucket: "crown-db-f9415.appspot.com",
    messagingSenderId: "862574522912",
    appId: "1:862574522912:web:136a0d357b78c2a96f0245",
    measurementId: "G-7K9CLQK8YM"
  };

  export const createUserProfileDocument = async(userAuth, additionalData )=>{
    if(!userAuth) return;
const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;