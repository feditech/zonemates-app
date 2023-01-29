import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
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
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Login({navigation}) {
  var Logo = require('../../assets/Icons/Logo.png');
  const [loading, setLoading] = useState(false);

  const userLogin = values => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('User has signin successfully');
        setLoading(false);
        navigation.replace('home');
        // ...
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#081B33" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome Back Mate!</Text>
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
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
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>

            <View style={styles.bottomText}>
              <Text>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.signupLink}> Signup Here </Text>
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
  },
  subHeading: {
    fontSize: 14,
  },
  inputView: {
    width: '80%',
    margin: 0,
  },
  TextInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    padding: 5,
    marginBottom: 10,
  },
  btn: {
    marginTop: 40,
    width: '80%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#081B33',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  bottomText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  signupLink: {
    color: '#081B33',
    fontWeight: '800',
  },
});
