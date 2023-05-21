import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const availableSlots = [
  { id: '4', time: '11:00 AM - 12:00 PM' },
  { id: '5', time: '2:00 PM - 3:00 PM' },
  { id: '6', time: '5:00 PM - 6:00 PM' },
  { id: '7', time: '11:00 AM - 12:00 PM' },
  { id: '8', time: '2:00 PM - 3:00 PM' },
  { id: '9', time: '5:00 PM - 6:00 PM' },
  { id: '11', time: '5:00 PM - 6:00 PM' },
];

const GameZoneBookingScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingPcCount, setBookingPcCount] = useState('');
  console.log('date from param', selectedDate);
  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleBookSlot = () => {
    // Handle the booking logic here
    console.log('Selected Slot:', selectedSlot);
    console.log('Number of PCs:', bookingPcCount);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      <View style={styles.slotContainer}>
        {availableSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[styles.slot, selectedSlot === slot.id && styles.selectedSlot]}
            onPress={() => handleSlotSelect(slot.id)}
            disabled={selectedSlot === slot.id}
          >
            <Text
              style={[
                styles.slotText,
                selectedSlot === slot.id && styles.selectedSlotText,
              ]}
            >
              {slot.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedSlot && (
        <View style={styles.bookingContainer}>
          <Text style={styles.bookingLabel}>Number of PCs:</Text>
          <TextInput
            style={styles.bookingInput}
            value={bookingPcCount}
            onChangeText={setBookingPcCount}
            placeholder="Number of PCs"
            keyboardType="numeric"
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.bookButton, selectedSlot === null && styles.disabledBookButton]}
        onPress={handleBookSlot}
        disabled={!selectedSlot}
      >
        <Text style={styles.bookButtonText}>Book Slot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#081B33',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slot: {
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#105e26',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081B33',
  },
  selectedSlotText: {
    color: '#fff',
  },
  bookingContainer: {
    marginTop: 20,
  },
  bookingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#081B33',
  },
  bookingInput: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#081B33',
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: '#081B33',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledBookButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameZoneBookingScreen;
