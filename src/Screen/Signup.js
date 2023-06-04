import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import useVerificationMutation from '../restapis/verification/send-verification-email';

import { showToast } from '../components/Toast';

const signupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name is too short!')
    .max(20, 'Name is too long!')
    .required('Name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Signup({ navigation }) {
  var Logo = require('../../assets/Icons/whitelogo.png');
  const [loading, setLoading] = useState(false);
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const { mutate: sendVerification } = useVerificationMutation();

  // const userSignup = values => {
  //   sendVerification({to: values.email, verificationCode: verificationCode});
  // };

  const userSignup = async values => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        const id = user.uid;
        console.log('User authenticated', user);

        firestore()
          .collection('users')
          .doc(id)
          .set({
            ...values,
            isVerified: false,
            verificationCode: verificationCode,
            codeTime: Date.now(),
            id: id,
            type: 'gamer',
          })
          .then(e => {
            console.log('User added! to firebase');
            setLoading(false);
            sendVerification({ to: values.email, verificationCode });
            navigation.replace('signupVerification');
            // navigation.navigate('signupVerification', {data: values});
          })
          .catch(error => {
            showToast('error', 'Error', error);

            setLoading(false);
          });
        //   const docRef = await addDoc(collection(db, 'users'), values);
        //   console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('auth error', errorCode, errorMessage);

        showToast('error', 'Error', errorMessage);
        setLoading(false);
        // ..
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
        initialValues={{ name:'',email: '', password: '' }}
        validationSchema={signupValidationSchema}
        // onSubmit={values => userLogin(values, navigation)}
        onSubmit={values => userSignup(values)}>
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
              name="name"
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholderTextColor={"#fff"}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
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
            <Text style={styles.btntext}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={{ color: '#fff' }}>Already Have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signupLink}> Login Here </Text>
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
