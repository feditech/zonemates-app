import { Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Button,
  Text,
} from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';
import { getPreciseDistance } from 'geolib';
import * as geolib from 'geolib';

export default function Map({ navigation }) {
  const [circleRadius, setCircleRadius] = useState(30000); // Initial radius of 5 km
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 2.12,
    longitudeDelta: 2.12
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
          latitudeDelta: 0.8,
          longitudeDelta: 0.8
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
          latitudeDelta: 0.8,
          longitudeDelta: 0.8
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
      const gamezoneData = querySnapshot.docs.map(doc => doc.data());
      return gamezoneData;
    } catch (error) {
      console.error('Error fetching user data: ', error);
      return [];
    }
  };

  // Fetch user data and set markers on MapView
  const fetchAndSetMarkers = async () => {
    console.log('fecthing markerss');
    const gamezoneData = await fetchGameZoneOwners();
    // Create an array of Marker components based on fetched user data
    const filteredGamezoneMarker = gamezoneData.filter(gamezone => {

      const distance = getPreciseDistance(
        { latitude: marker.latitude, longitude: marker.longitude },
        { latitude: gamezone?.latLng?.lat, longitude: gamezone?.latLng?.lng }
      );
      return distance <= circleRadius;
    });
    const markers = filteredGamezoneMarker.map(gamezone => {
      return (
        <Marker
          key={gamezone.id} // Use a unique identifier as the key
          coordinate={{ latitude: gamezone.latLng.lat, longitude: gamezone.latLng.lng }}
          title={gamezone.name}
          description={gamezone.tagLine}>
          <Icon name="map-marker" size={30} color="#081B33" />
          <Callout
            style={{ width: 200 }}
            onPress={() =>
              navigation.navigate('GameZoneProfile', { gameZoneData: gamezone })
            }>
            <Text >{gamezone.name}</Text>
            <Text>{gamezone.tagLine}</Text>
          </Callout>
        </Marker>
      );
    });
    setMarkers(markers);
  };
  // Call fetchAndSetMarkers to fetch user data and set markers on MapView
  useEffect(() => {
    fetchAndSetMarkers();
  }, [marker]);
  return (
    <View style={styles.container}>
      {/* Render our MapView */}
      <MapView style={styles.map} region={region} initialRegion={region}>
        <Marker draggable onDragEnd={e => console.log(e)} coordinate={marker}>
          <Icon name="map-marker" size={30} color="red" />
        </Marker>
        {markers}
        <Circle
          center={marker}
          radius={circleRadius}
          strokeWidth={2}
          strokeColor="rgba(25,67,30,0.1)"
          fillColor="rgba(8,27,51,0.1)"
        />
      </MapView>
      {/* Render a TouchableOpacity button for "Find My Location" */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getOneTimeLocation}>
        <MaterialIcons name="my-location" size={30} color="#081B33" />
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
