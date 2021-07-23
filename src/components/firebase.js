// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCQaT1Z2wRKF0OmRX4V_bspGoUy0ook8DQ",
    authDomain: "instagram-clone-cb036.firebaseapp.com",
    projectId: "instagram-clone-cb036",
    storageBucket: "instagram-clone-cb036.appspot.com",
    messagingSenderId: "817650600777",
    appId: "1:817650600777:web:70d39d4bdde133119f2898",
    measurementId: "G-GHZYRC9MGP"
  });

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();

  export {db, auth, storage};