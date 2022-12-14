import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as yup from 'yup';
import {Formik} from 'formik';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/Firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function SignupVerification() {
  var Logo = require('../../assets/Icons/Logo.png');
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Signup Verification</Text>
      </View>
      <OTPInputView
        style={{width: '80%', height: 100, color: 'red'}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btntext}>Resend Code</Text>
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
    fontWeight: '800',
    color: 'black',
    margin: 5,
  },
  subHeading: {
    fontSize: 14,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#105e26',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#105e26',
  },

  btn: {
    marginTop: 40,
    width: '80%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#105e26',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});
