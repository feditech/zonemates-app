// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {handleSendVerification} from '../Screen/SignupVerification';

//   // Handle confirm code button press



// import {initializeApp} from 'firebase/app';
// import {getFirestore, collection, addDoc} from 'firebase/firestore';

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAT7ZAnhCSOhnI8W8fZEloyhtNzl3YJ7L8',
//   authDomain: 'zonemates-app-ec082.firebaseapp.com',
//   projectId: 'zonemates-app-ec082',
//   storageBucket: 'zonemates-app-ec082.appspot.com',
//   messagingSenderId: '255602582619',
//   appId: '1:255602582619:web:7fe787a35f78ea9209cb7e',
// };

// const app = initializeApp(firebaseConfig);
// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
// const firebaseAuth = getAuth();

// const userSignup = (values, navigation) => {
//   createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
//     .then(async userCredential => {
//       // Signed in
//       const user = userCredential.user;
//       // console.log(user);
//       // setTimeout(() => {
//       //   navigation.navigate('login');
//       // }, 2000);
//       const docRef = await addDoc(collection(db, 'users'), values);
//       console.log('Document written with ID: ', docRef.id);
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//       // ..
//     });
// };

// async function signInWithPhoneNumber(phoneNumber) {
//   console.log(phoneNumber)
//   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//   console.log(confirmation)
// }

// const userLogin = (values, navigation) => {
//   signInWithEmailAndPassword(firebaseAuth, values.email, values.password)
//     .then(userCredential => {
//       // Signed in
//       const user = userCredential.user;
//       console.log('User has signin successfully');
//       navigation.navigate('home');
//       // ...
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//     });
// };

// export {firebaseAuth, userSignup, userLogin, db, collection, addDoc,signInWithPhoneNumber};
