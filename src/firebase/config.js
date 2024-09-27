import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqTQZOG92oW691E3j3QsrKyzBj8XpFDwY",
  authDomain: "library-18211.firebaseapp.com",
  projectId: "library-18211",
  storageBucket: "library-18211.appspot.com",
  messagingSenderId: "364109176214",
  appId: "1:364109176214:web:1b3a61f6c04467ab7e51b7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);    
const storage = getStorage(app);  
const auth = getAuth(app);        


export { db, storage, auth };