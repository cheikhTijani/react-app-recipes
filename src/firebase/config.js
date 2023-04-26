import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_api_key,
    authDomain: "quick-recipes-7d1ad.firebaseapp.com",
    projectId: "quick-recipes-7d1ad",
    storageBucket: "quick-recipes-7d1ad.appspot.com",
    messagingSenderId: "72332272903",
    appId: "1:72332272903:web:ea57cd43907e5fa3b911a2"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectStorage = firebase.firestore();
const storage = firebase.storage();

export { projectStorage, storage }