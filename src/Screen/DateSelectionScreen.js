import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateSelectionScreen = ({ route, navigation }) => {
  const { gameZoneId } = route.params;
 console.log( { selectedDate, gameZoneId }) 
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 300,
    }).start();
  }, [scaleAnim, opacityAnim]);

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleContinue = () => {
    navigation.navigate('Booking', { selectedDate: selectedDate.toISOString(), gameZoneId });
  };
  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 6);
    return date;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentContainer,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}>
        <View style={styles.header}>
          <Text style={styles.title}>Select a Date</Text>
        </View>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => setShowDatePicker(true)} >
            <Text style={styles.btnText}>Select Date</Text>
            </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateSelect}
              style={styles.dateTimePicker}
              minimumDate={new Date()} // Disable previous dates
              maximumDate={getMaxDate()} // Disable dates after 7 days from today

            />
          )}
        </View>
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Icon name="calendar" size={24} color="#fff" />
            <Text style={styles.selectedDateText}>
              {selectedDate.toDateString()}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedDate}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081B33',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dateTimePicker: {
    width: '100%',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  btn:{
    backgroundColor:'#081B33',
    padding:5,
    borderRadius:10
  },
  btnText:{
    color:'#fff',
    fontSize:20,
    textAlign:'center'

  }
});

export default DateSelectionScreen;
