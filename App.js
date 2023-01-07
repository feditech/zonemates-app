import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screen/Login';
import Map from './src/Screen/Map';
import Signup from './src/Screen/Signup';
import SignupVerification from './src/Screen/SignupVerification';
import Zonelist from './src/Screen/Zonelist';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
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
        <Stack.Screen name="home" component={Map} />
        <Stack.Screen name="zonelist" component={Zonelist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;