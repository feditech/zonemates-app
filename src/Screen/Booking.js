import React, {useState} from 'react';
import {ScrollView,View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const availableSlots = [
  {
    id: '1',
    date: 'Monday, May 2nd',
    slots: [
      {id: '1', time: '10:00 AM - 11:00 AM'},
      {id: '2', time: '12:00 PM - 1:00 PM'},
      {id: '3', time: '2:00 PM - 3:00 PM'},
    ],
  },
  {
    id: '2',
    date: 'Tuesday, May 3rd',
    slots: [
      {id: '4', time: '11:00 AM - 12:00 PM'},
      {id: '5', time: '2:00 PM - 3:00 PM'},
      {id: '6', time: '5:00 PM - 6:00 PM'},
    ],
  },
  {
    id: '3',
    date: 'Wednesday, May 4th',
    slots: [
      {id: '7', time: '10:00 AM - 11:00 AM'},
      {id: '8', time: '12:00 PM - 1:00 PM'},
      {id: '9', time: '2:00 PM - 3:00 PM'},
    ],
  },
];

const GameZoneBookingScreen = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSlotSelect = (slotId, slotDate) => {
    const alreadySelected = selectedSlots.find(
      slot => slot.id === slotId && slot.date === slotDate,
    );

    if (alreadySelected) {
      setSelectedSlots(prevSelected =>
        prevSelected.filter(
          slot =>
            slot.id !== alreadySelected.id ||
            slot.date !== alreadySelected.date,
        ),
      );
    } else {
      setSelectedSlots(prevSelected => [
        ...prevSelected,
        {id: slotId, date: slotDate},
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      {availableSlots.map(slot => (
        <View key={slot.id} style={styles.slotContainer}>
          <Text style={styles.date}>{slot.date}</Text>
          {slot.slots.map(s => (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.slot,
                selectedSlots.find(
                  slot => slot.id === s.id && slot.date === slot.date,
                ) && styles.selectedSlot,
              ]}
              onPress={() => handleSlotSelect(s.id, slot.date)}>
              <Text style={styles.slotTime}>{s.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Slots</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slotContainer: {
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slot: {
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  selectedSlot: {
    backgroundColor: '#105e26',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bookButton: {
    marginTop: 20,
  },
});
export default GameZoneBookingScreen;