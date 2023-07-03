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
import ForgotPasswordScreen from './src/Screen/ForgotPasswordScreen';
import BookingList from './src/Screen/BookingList';


import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthProvider from './src/store/AuthProvider';
import Toast from 'react-native-toast-message';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
            <Foundation name="list" size={30} color="#081B33" />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="map-marker" size={30} color="#081B33" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="user" size={30} color="#081B33" />
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
            <Stack.Screen name="home" component={MyTabs} />
            <Stack.Screen name="GameZoneProfile" component={GameZoneProfile} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="DateSelectionScreen" component={DateSelectionScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="BookingList" component={BookingList} />
       
            
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;
