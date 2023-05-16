import {Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Button,
  Text,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';
export default function Map({navigation}) {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [locationStatus, setLocationStatus] = useState('');
  useEffect(() => {
    console.log('use Effect');
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    console.log('here we are');
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation?.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');

        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  //   to show markers of the game zones
  const [markers, setMarkers] = useState('');
  // Fetch user data from Firestore
  const fetchGameZoneOwners = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('type', '==', 'owner')
        .get();
      const userData = querySnapshot.docs.map(doc => doc.data());
      return userData;
    } catch (error) {
      console.error('Error fetching user data: ', error);
      return [];
    }
  };

  // Fetch user data and set markers on MapView
  const fetchAndSetMarkers = async () => {
    console.log('fecthing markerss');
    const userData = await fetchGameZoneOwners();
    // Create an array of Marker components based on fetched user data
    const markers = userData.map(user => {
      return (
        <Marker
          key={user.id} // Use a unique identifier as the key
          coordinate={{latitude: user.latLng.lat, longitude: user.latLng.lng}}
          title={user.name}
          description={user.tagLine}>
          <Icon name="map-marker" size={30} color="green" />
          <Callout
            style={{width: 200}}
            onPress={() =>
              navigation.navigate('GameZoneProfile', {gameZoneData: user})
            }>
            <Text >{user.name}</Text>
            <Text>{user.tagLine}</Text>
          </Callout>
        </Marker>
      );
    });
    setMarkers(markers);
  };
  // Call fetchAndSetMarkers to fetch user data and set markers on MapView
  useEffect(() => {
    fetchAndSetMarkers();
  }, []);
  return (
    <View style={styles.container}>
      {/* Render our MapView */}
      <MapView style={styles.map} region={region} initialRegion={region}>
        <Marker draggable onDragEnd={e => console.log(e)} coordinate={marker}>
          <Icon name="map-marker" size={30} color="blue" />
        </Marker>
        {markers}
      </MapView>
      {/* Render a TouchableOpacity button for "Find My Location" */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getOneTimeLocation}>
        <MaterialIcons name="my-location" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
}

// Create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
});
