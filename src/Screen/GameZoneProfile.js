import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GameZoneProfileScreen = ({ route, navigation }) => {
  const { gameZoneData } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateAnim] = useState(new Animated.Value(300));

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
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1Df14f', '#134ff8']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}>
          <Image
            source={require('../../assets/Icons/Logo.png')}
            style={styles.logo}
          />
        </Animated.View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{gameZoneData.name}</Text>
          <Text style={styles.email}>{gameZoneData.email}</Text>
          <Text style={styles.description}>{gameZoneData.tagLine}</Text>
          <Text style={styles.description}>{gameZoneData.aboutGameZone}</Text>
          <Button title="Book a slot" onPress={() => navigation.navigate('Booking')} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode:'contain'
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default GameZoneProfileScreen;
