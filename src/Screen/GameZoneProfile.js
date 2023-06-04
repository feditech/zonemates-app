import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, StyleSheet, Animated } from 'react-native';

const GameZoneProfileScreen = ({ route, navigation }) => {
  const { gameZoneData } = route.params;
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
        ]}
      >
        <Image
          source={
            gameZoneData.profileImage
              ? { uri: gameZoneData.profileImage }
              : require('../../assets/Icons/Logo.png')
          }
          style={styles.logo}
        />
        <Text style={styles.name}>{gameZoneData.name}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.detailsContainer,
          { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
        ]}
      >
        <Text style={styles.description}>{gameZoneData.tagLine}</Text>
        <Text style={styles.description}>{gameZoneData.aboutGameZone}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {gameZoneData.email}</Text>
          <Text style={styles.infoText}>
            No. of PCs: {gameZoneData.noOfPcs}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.submitbutton}
            title="Book a Slot"
            onPress={() => navigation.navigate('DateSelectionScreen' , { gameZoneId: gameZoneData.id })}
            color="#081B33" // Set the color to #081B33
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Set a different background color
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#081B33', // Set the color to #081B33
  },
  detailsContainer: {
    borderRadius: 20,
    padding: 20,
    width: '80%',
    backgroundColor: '#fff', // Set a different background color
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Set a different color for the text
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666', // Set a different color for the text
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  submitbutton: {
    color: '#081B33', // Set the color to #081B33
  },
});

export default GameZoneProfileScreen;
