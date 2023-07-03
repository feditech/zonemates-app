import React, { useState, useContext, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../store/AuthProvider';
import { showToast } from '../components/Toast';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Login({ navigation }) {





  var Logo = require('../../assets/Icons/whitelogo.png');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const userLogin = values => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('User has signin successfully');

        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(userData => {
            setLoading(false);
            userData._data.isVerified
              ? (showToast('success', 'User Login Successfully'),
                navigation.replace('home'))
              : (showToast('error', 'User is un verified'),
                navigation.replace('signupVerification'));
          })
          .catch(err => {
            showToast('error', 'Error', err)
            console.log('err', err);
            setLoading(false);
          });

        // ...
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == 'auth/user-not-found')
          showToast('error', "Error", "User not found")
        else
          showToast('error', errorCode, errorMessage)
      });
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome Back Mate!</Text>
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        // onSubmit={values => userLogin(values, navigation)}
        onSubmit={values => userLogin(values, navigation)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                name="email"
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                placeholderTextColor={"#fff"}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.TextInput}
                name="password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                placeholderTextColor={"#fff"}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>

            <View style={styles.bottomText}>
              <Text style={{ color: '#fff' }}>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.signupLink}> Signup Here </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomText}>
            
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.signupLink}> Forgot Password? </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
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
    color: '#fff'
  },
  inputView: {
    width: '80%',
    margin: 0,
    color: '#fff'
  },
  TextInput: {
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
    fontWeight:'bold',
    color: '#081B33',
  },
  bottomText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff'
  },
  errorText: {
    color: 'red',
  },
  signupLink: {
    color: '#fff',
    fontWeight: '800',
  },
});
