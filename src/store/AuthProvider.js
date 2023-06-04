import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
export const AuthContext = createContext({
  user: null,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      console.log("user ====>", user)
      const userDocument = await firestore().collection('users').doc(user.uid).get();
      const userInfo = userDocument._data
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
