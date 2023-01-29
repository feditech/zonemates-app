import React, {useEffect, useState} from 'react';
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
import {set} from 'lodash';

export default function SignupVerification({route, navigation}) {
  var Logo = require('../../assets/Icons/Logo.png');
  // If null, no SMS has been sent
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function getdata() {
    if (user) {
      const userData = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      setUserData(userData);
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  const confirmCode = code => {
    if (code == userData?._data.verificationCode) {
      if (isValidCode(userData?._data?.codeTime)) {
        console.log('verification complete');
        navigation.replace('home');
      } else {
        console.log('code is Expired');
      }
    } else console.log('Code is invalid');
  };

  function isValidCode(codeTimestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - codeTimestamp;
    return timeDiff <= 30 * 60 * 1000;
  }

  if (initializing)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#081B33" />
      </View>
    );

  if (!user) {
    return (
      <View>
        <Text>User not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Signup Verification</Text>
      </View>
      <OTPInputView
        style={{width: '80%', height: 100, color: 'red'}}
        pinCount={6}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged={code => {
        //   setCode(code);
        // }}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          confirmCode(code);
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
    color: 'red',
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
    color: '#105e26',
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

// useEffect(() => {
//   const sendVerificationCode = async () => {
//     const confirmation = await auth().verifyPhoneNumber(data.phone);
//     setConfirm(confirmation);
//   };
//   sendVerificationCode();
// }, []);

// async function confirmCode(code) {
//   try {
//     const credential = auth.PhoneAuthProvider.credential(
//       confirm.verificationId,
//       code,
//     );
//     let userData = await auth().currentUser.linkWithCredential(credential);
//     setUser(userData.user);
//     console.log("verified")
//   } catch (error) {
//     if (error.code == 'auth/invalid-verification-code') {
//       console.log('Invalid code.');
//     } else {
//       console.log('Account linking error');
//     }
//   }
// }
