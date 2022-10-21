// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoyFtoR0o1IxGCRujppzyQSASz1GDOWls",
  authDomain: "associados-12c97.firebaseapp.com",
  databaseURL: "https://associados-12c97-default-rtdb.firebaseio.com",
  projectId: "associados-12c97",
  storageBucket: "associados-12c97.appspot.com",
  messagingSenderId: "530293098069",
  appId: "1:530293098069:web:97ee28e71b83cc6b78f6dc",
  measurementId: "G-QB4C5T7MEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);