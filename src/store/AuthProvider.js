import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
export const AuthContext = createContext({
  user: null,
});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  console.log('Context', user);
  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
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
