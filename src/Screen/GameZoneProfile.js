import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Button, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GameZoneProfileScreen = ({route, navigation}) => {
  const {gameZoneData} = route.params;
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
      <LinearGradient
        colors={['#1Df14f', '#134ff8']}
        style={styles.background}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Animated.View
          style={[
            styles.logoContainer,
            {opacity: fadeAnim, transform: [{translateY: translateAnim}]},
          ]}>
          <Image
            source={require('../../assets/Icons/Logo.png')}
            style={styles.logo}
          />
          <Text style={styles.name}>{gameZoneData.name}</Text>
        </Animated.View>
        <LinearGradient
          colors={['#134ff8', '#1Df14f']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.detailsContainer}>
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
              onPress={() => navigation.navigate('DateSelectionScreen')}
              color="#333"
            />
          </View>
        </LinearGradient>
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
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#fff',
  },
  detailsContainer: {
    // backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  submitbutton: {
    color: '#fff',
  },
});

export default GameZoneProfileScreen;
