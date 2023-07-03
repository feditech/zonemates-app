import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { showToast } from '../components/Toast';
import { AuthContext } from '../store/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-picker';



const ProfileScreen = ({ navigation }) => {

  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user.phone || 'No Phone Number');
  const [address, setAddress] = useState(user.address || 'No Address Found');
  const [profileImage, setProfileImage] = useState(user.profileImage)

  

  const handlelogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser({})
        showToast('success', 'User Signout');
        navigation.replace('login');
      })
      .catch(() => {
        showToast('error', 'User Signout Failed');

      });
  };


  const handleUpdate = async () => {
    if (!name) {
      showToast('error', 'Invalid Name');
      return;
    }
    if (!phone) {
      showToast('error', 'Invalid Phone');
      return;
    }
    if (!address) {
      showToast('error', 'Invalid Address');
      return;
    }




    try {
      const gamerRef = firestore().collection('users').doc(user.id);
      await firestore().runTransaction(async (transaction) => {
        let updatedGamerData;
        updatedGamerData = {
          ...user,
          name,
          phone,
          address
        };
        // Update the document with the updated gamer data
        transaction.update(gamerRef, updatedGamerData);
        showToast('success', 'Profile Updated successful');
        setUser(updatedGamerData)
        setIsEditable(false)
        setLoading(false)

      });
    } catch (error) {
      showToast('error', 'Update Profile Failed', `${error}`);
      setLoading(false)
      console.log('Error booking slot:', error);
    }


  };








  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0913b3" />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {!isEditable &&
          <TouchableOpacity
            style={{ width: "90%", position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 10, borderRadius: 5, marginTop: 5 }}
            onPress={() => setIsEditable(true)}>
            <Text style={{ color: '#081B33', marginRight: 10 }}>Edit Profile</Text>
            <FontAwesomeIcon name="pencil" size={20} color="#081B33" />
          </TouchableOpacity>
        }
        <TouchableOpacity disabled={!isEditable} >
          <Image
            source={{ uri: profileImage?.uri || 'https://picsum.photos/200' }}
            style={styles.avatar}
          />
        </TouchableOpacity>


        <View >

          {isEditable ?
            <TextInput
              style={styles.nameTextInput}
              name="name"
              placeholder="Name"
              onChangeText={(e) => setName(e)}
              value={name}
              keyboardType="default"
              placeholderTextColor={"#e5e5e5"}
              autoFocus
            />
            : <>
              <Text style={styles.name}>{user.name}</Text>
              {/* <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 5, backgroundColor: '#081B33', marginTop: 5 }}
                onPress={() => setIsEditable(true)}>
                <Text style={{ color: '#fff', marginRight: 10 }}>Edit Profile</Text>
                <FontAwesomeIcon name="pencil" size={20} color="#fff" />

              </TouchableOpacity> */}
            </>
          }

        </View>
      </View>
      <View style={styles.detailsContainer}>

      {!isEditable &&
          <>
            <TouchableOpacity
              style={{ width: '40%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 5, backgroundColor: '#081B33', marginTop: 5 }}
              onPress={() =>navigation.navigate("BookingList")}>
              <Text style={{ color: '#fff', marginRight: 10 }}>My Bookings</Text>
              <FontAwesomeIcon name="list" size={17} color="#fff" />
            </TouchableOpacity>
          </>
        }


        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          {isEditable ?
            <TextInput
              style={styles.detailValueTextInput}
              name="phone"
              placeholder="Phone"
              onChangeText={(e) => setPhone(e)}
              value={phone}
              keyboardType="number-pad"
              placeholderTextColor={"#e5e5e5"}
            />
            :
            <Text style={styles.detailValue}>{phone}</Text>
          }
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          {isEditable ?
            <TextInput
              style={styles.detailValueTextInput}
              name="address"
              placeholder="Address"
              onChangeText={(e) => setAddress(e)}
              value={address}
              placeholderTextColor={"#e5e5e5"}
            />
            :
            <Text style={styles.detailValue}>{address}</Text>
          }

        </View>
      

      </View>
      {isEditable ?
        <TouchableOpacity style={styles.logoutButton} onPress={handleUpdate}>
          <Text style={styles.logoutButtonText}>Update Profile</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.logoutButton} onPress={handlelogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

      }
    </ScrollView>
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
    textAlign: 'center'
  },
  nameTextInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
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
    alignItems: 'center',
    marginVertical: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  detailValueTextInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    fontWeight: 'bold'

  },
  logoutButton: {
    marginVertical: 20,
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
