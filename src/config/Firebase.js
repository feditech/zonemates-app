import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {collection, addDoc} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAT7ZAnhCSOhnI8W8fZEloyhtNzl3YJ7L8',
  authDomain: 'zonemates-app-ec082.firebaseapp.com',
  projectId: 'zonemates-app-ec082',
  storageBucket: 'zonemates-app-ec082.appspot.com',
  messagingSenderId: '255602582619',
  appId: '1:255602582619:web:7fe787a35f78ea9209cb7e',
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  collection,
  addDoc,
};
