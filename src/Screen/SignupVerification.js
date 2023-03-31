import React, {useContext, useEffect, useState} from 'react';
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
import {AuthContext} from '../store/AuthProvider';
import {showToast} from '../components/Toast';

import useVerificationMutation from '../restapis/verification/send-verification-email';

export default function SignupVerification({route, navigation}) {
  var Logo = require('../../assets/Icons/Logo.png');

  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const {mutate: sendVerification, isError} = useVerificationMutation();

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
    'calling data';
    getdata();
  }, [user]);

  const confirmCode = code => {
    setLoading(true);
    console.log('code', code);
    console.log('code from data base', userData?._data?.verificationCode);
    if (code == userData?._data.verificationCode) {
      if (isValidCode(userData?._data?.codeTime)) {
        console.log('verification complete');

        const updatedUser = Object.entries(userData?._data).filter(([key]) => key !== 'codeTime' && key !== 'verificationCode').reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
    
        updatedUser.isVerified = true;
        firestore()
          .collection('users')
          .doc(userData?._data?.id)
          .set(updatedUser)
          .then(e => {
            console.log('User added! to firebase');
            setLoading(false);
            // sendVerification({to: values.email, verificationCode});

            showToast('success', 'Success', 'User Verified');
            navigation.replace('home');

            // navigation.navigate('signupVerification', {data: values});
          })
          .catch(error => {
            showToast('error', 'Error', error);

            setLoading(false);
          });
      } else {
        showToast('error', 'Error', 'code is Expired');
        setLoading(false);
      }
    } else {
      console.log('Code is invalid');
      setLoading(false);
      showToast('error', 'Error', 'code is Invalid');
    }
  };
  function isValidCode(codeTimestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - codeTimestamp;
    return timeDiff <= 30 * 60 * 1000;
  }

  const codeResend = () => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log("REsend code",verificationCode)
    userData &&
      (sendVerification({to: userData?._data?.email, verificationCode}),
      firestore()
        .collection('users')
        .doc(userData?._data?.id)
        .update({
          verificationCode: verificationCode,
          codeTime: Date.now(),
        })
        .then(() => {
          console.log('User updated!');
        }));
  };

  // if (initializing)
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#081B33" />
  //     </View>
  //   );

  // if (!user) {
  //   return (
  //     <View>
  //       <Text>User not logged in</Text>
  //     </View>
  //   );
  // }
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#081B33" />
    </View>
  ) : (
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
      <TouchableOpacity style={styles.btn} onPress={codeResend}>
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
    fontWeight: '600',
    margin: 5,
  },
  subHeading: {
    fontSize: 14,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    
    color: '#081B33',
    borderBottomWidth: 2,
  },

  borderStyleHighLighted: {
    borderColor: '#081B33',
  },

  underlineStyleBase: {
    color: '#081B33',
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
  },

  underlineStyleHighLighted: {
    borderColor: '#081B33',
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
