// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage'; // Import FirebaseStorage type
import { getFirestore, Firestore } from 'firebase/firestore'; // Import Firestore type
import { ref } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMlP6GDQ2XmckvyCegctFIoj62Uo9Ja10",
    authDomain: "aves-mobile-web.firebaseapp.com",
    projectId: "aves-mobile-web",
    storageBucket: "aves-mobile-web.appspot.com",
    messagingSenderId: "242945443809",
    appId: "1:242945443809:web:5cb4212c2d5458b829b4a0",
    measurementId: "G-Y5PHWERD3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore= getFirestore(app); // Specify Firestore type
const storage= getStorage(app); // Specify FirebaseStorage type
const auth=getAuth();
export { firestore, analytics, storage,ref,auth };
