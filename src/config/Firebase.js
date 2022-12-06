import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAT7ZAnhCSOhnI8W8fZEloyhtNzl3YJ7L8',
  authDomain: 'zonemates-app-ec082.firebaseapp.com',
  projectId: 'zonemates-app-ec082',
  storageBucket: 'zonemates-app-ec082.appspot.com',
  messagingSenderId: '255602582619',
  appId: '1:255602582619:web:7fe787a35f78ea9209cb7e',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {auth};
