// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi2CEscCe1D2N7xqF2HwFhRdpi2mA-3lk",
  authDomain: "netflixgpt-e30b3.firebaseapp.com",
  projectId: "netflixgpt-e30b3",
  storageBucket: "netflixgpt-e30b3.appspot.com",
  messagingSenderId: "174138637819",
  appId: "1:174138637819:web:3cea532884f250ad821f5e",
  measurementId: "G-2LP71ZKQJ6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
