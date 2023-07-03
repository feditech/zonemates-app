import React, { useContext, useEffect, useState } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../store/AuthProvider';
import { showToast } from '../components/Toast';

export default function ForgotPasswordScreen({ route, navigation }) {
  var Logo = require('../../assets/Icons/whitelogo.png');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const forgotPassword = (email) => {
    setLoading(true)
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      auth().sendPasswordResetEmail(email)
        .then(function (user) {
          showToast('success', 'Please check your email...')
          setLoading(false)
          navigation.navigate('login')
        }).catch(function (e) {
          console.log('error',e)
          showToast('error', `error ${e}`)

          setLoading(false)
        })
    }
    else {
      showToast('error', 'Invalid email')
    }
  }


  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <View style={styles.container}>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Forgot Password</Text>
      </View>
      <TextInput
        style={styles.TextInput}
        name="email"
        placeholder="Email Address"
        onChangeText={(e) => setEmail(e)}
        // onBlur={handleBlur('email')}
        value={email}
        keyboardType="email-address"
        placeholderTextColor={"#fff"}
      />
      <TouchableOpacity style={styles.btn} onPress={() => forgotPassword(email)} >
        <Text style={styles.btntext}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

    backgroundColor: '#081B33',
    color: '#fff'
  },
  Logo: {
    width: 180,
    height: 100,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    margin: 5,
    color: '#fff'
  },
  subHeading: {
    fontSize: 14,
  },
  TextInput: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    padding: 5,
    marginBottom: 10,
    color: '#fff',
    placeholderTextColor: '#fff', // Add this line to set the placeholder text color

  },

  btn: {
    marginTop: 40,
    width: '80%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#081B33',
  },
});
