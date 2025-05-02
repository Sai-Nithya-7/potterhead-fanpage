// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn0rh-jCWOPee087EmGRP1dPFeNKMPFIo",
  authDomain: "harry-potter-fanpage-77.firebaseapp.com",
  projectId: "harry-potter-fanpage-77",
  storageBucket: "harry-potter-fanpage-77.firebasestorage.app",
  messagingSenderId: "629625187675",
  appId: "1:629625187675:web:7e427a5eebba92d77dbe7e",
  measurementId: "G-PQBWFM3XW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);