// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: 'real-estate-d41b1.firebaseapp.com',
	projectId: 'real-estate-d41b1',
	storageBucket: 'real-estate-d41b1.appspot.com',
	messagingSenderId: '709531659655',
	appId: '1:709531659655:web:bb03ff0bdf52d2d06e7722',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
