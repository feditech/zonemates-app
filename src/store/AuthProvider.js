import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
export const AuthContext = createContext({
  user: null,
});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  console.log('Context', user);
  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      const userDocument = await firestore().collection('users').doc(user.uid).get();
      // const userData = firestore().collection(`users`).doc(`hSxIySw6UVeW05YdgCT2tYnxaAD3`).get();
      const userInfo = userDocument._data
      console.log("usersDtaaaa---->", userInfo )
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
