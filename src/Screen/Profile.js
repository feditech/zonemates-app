<<<<<<< HEAD
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showToast} from '../components/Toast';
const ProfileScreen = ({navigation}) => {
  const handlelogout = () => {
    auth()
      .signOut()
      .then(() => {
        showToast('success', 'Success', 'User Signout');
        navigation.replace('login');
      })
      .catch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>{'Player'}</Text>
        <Text style={styles.username}>@{'renza11'}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{'abc@gmail.com'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{'0311111111'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{'Streen11, K9 Zone 10'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handlelogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 20,
    textAlign: 'center',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#081B33',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
=======
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
>>>>>>> dev
