import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
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
const phoneRegExp = /^\+92[0-9]{10}$/;
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
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export default function Signup({navigation}) {
  var Logo = require('../../assets/Icons/Logo.png');
  const [loading, setLoading] = useState(false);

  const userSignup = values => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('User authenticated');
        firestore()
          .collection('Users')
          .add(values)
          .then(async e => {
            console.log('User added! to firebase');
            setLoading(false);
            navigation.navigate('signupVerification', {data: values});
          })
          .catch(error => {
            console.log('firestore', error);
            setLoading(false);
          });
        //   const docRef = await addDoc(collection(db, 'users'), values);
        //   console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('auth error', errorCode, errorMessage);
        setLoading(false);
        // ..
      });
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#081B33" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{display:'flex',backgroundColor:'red',margin: 0}}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.Logo} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create your account</Text>
        </View>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            phone: '',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => userSignup(values, navigation)}
          // onSubmit= { values => console.log(values.email)}
        >
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
                {/* <TextInput
                  style={styles.TextInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                <TextInput
                  style={styles.TextInput}
                  name="phone"
                  placeholder="Phone"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && touched.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )} */}
              </View>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btntext}>Signup</Text>
              </TouchableOpacity>
              <View style={styles.bottomText}>
                <Text>Already Have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={styles.signupLink}> Login Here </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height:'100%'
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
  errorText: {
    color: 'red',
  },
  bottomText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupLink: {
    color: '#081B33',
    fontWeight: '800',
  },
});
