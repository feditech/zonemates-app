import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screen/Login';
import Map from './src/Screen/Map';
import Signup from './src/Screen/Signup';
import SignupVerification from './src/Screen/SignupVerification';
import Zonelist from './src/Screen/Zonelist';
import Profile from './src/Screen/Profile';
import GameZoneProfile from './src/Screen/GameZoneProfile';
import Booking from './src/Screen/Booking';
import DateSelectionScreen from './src/Screen/DateSelectionScreen';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthProvider from './src/store/AuthProvider';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#081B33',
      }}>
      <Tab.Screen
        name="ZoneList"
        component={Zonelist}
        options={{
          tabBarLabel: 'ZoneList',
          tabBarIcon: ({color, size}) => (
            <Foundation name="list" size={30} color="#105e26" />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker" size={30} color="#105e26" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={30} color="#105e26" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen
              name="signupVerification"
              component={SignupVerification}
            />
            <Stack.Screen name="GameZoneProfile" component={GameZoneProfile} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="DateSelectionScreen" component={DateSelectionScreen} />
            <Stack.Screen name="home" component={MyTabs} />
            {/* <Stack.Screen name="zonelist" component={Zonelist} /> */}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;

// import React, {useState, useEffect} from 'react';
// import {Button, TextInput, Text} from 'react-native';
// import auth from '@react-native-firebase/auth';
// const App = () => {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     console.log(user)
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle create account button press
//   async function  createAccount() {
//     try {
//       await auth().createUserWithEmailAndPassword(
//         'jane.doe@example.com',
//         'SuperSecretPassword!',
//       );
//       console.log('User account created & signed in!');
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }
//       console.error(error);
//     }
//   }

//   // Handle the verify phone button press
//   async function verifyPhoneNumber(phoneNumber) {
//     const confirmation = await auth().verifyPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   // Handle confirm code button press
//   async function confirmCode() {
//     try {
//       const credential = auth.PhoneAuthProvider.credential(
//         confirm.verificationId,
//         code,
//       );
//       let userData = await auth().currentUser.linkWithCredential(credential);
//       setUser(userData.user);
//     } catch (error) {
//       if (error.code == 'auth/invalid-verification-code') {
//         console.log('Invalid code.');
//       } else {
//         console.log('Account linking error');
//       }
//     }
//   }

//   if (initializing) return null;

//   if (!user) {
//     return <Button title="Login" onPress={() => createAccount()} />;
//   } else if (!user.phoneNumber) {
//     if (!confirm) {
//       return (
//         <Button
//           title="Verify Phone Number"
//           onPress={() =>
//             verifyPhoneNumber('+923112305878')
//           }
//         />
//       );
//     }
//     return (
//       <>
//         <TextInput value={code} onChangeText={text => setCode(text)} />
//         <Button title="Confirm Code" onPress={() => confirmCode()} />
//       </>
//     );
//   } else {
//     return (
//       <Text>
//         Welcome! {user.phoneNumber} linked with {user.email}
//       </Text>
//     );
//   }
// };
