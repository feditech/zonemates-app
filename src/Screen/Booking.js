import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../components/Toast';
import { AuthContext } from '../store/AuthProvider';
const Booking = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);

  const profile = useContext(AuthContext)
  console.log("PRofile", profile.user)
  const GamerId = profile.user.id
  const { selectedDate, gameZoneId } = route.params;
  const parsedDate = new Date(selectedDate);
  const day = parsedDate.getDay()
  const formattedSelectedDate = `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;


  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingPcCount, setBookingPcCount] = useState('');
  const [availableSlots, setAvailableSlots] = useState([])

  console.log("selected slot", selectedSlot)

  const getData = () => {
    setLoading(true);
    firestore()
      .collection('users')
      .doc(gameZoneId)
      .get()
      .then((gameZoneData) => {
        if (day === 1) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Monday')[0]);
        } else if (day === 2) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Tuesday')[0]);
        } else if (day === 3) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Wednesday')[0]);
        } else if (day === 4) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Thursday')[0]);
        } else if (day === 5) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Friday')[0]);
        } else if (day === 6) {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Saturday')[0]);
        } else {
          setAvailableSlots(gameZoneData._data.slots.filter(e => e.day === 'Sunday')[0]);
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        showToast('error', 'Error in getting slots', `${error}`);
      });
  };

  useEffect(() => {
    getData();
    console.log("available slots", availableSlots)
  }, []);
  useEffect(() => {
    getData();
    console.log(", selected slot changed")
  }, []);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };


  const handleBookSlot = async () => {
    if (!selectedSlot) {
      showToast('error', 'Please Select a Slot');
      return;
    }

    if (!bookingPcCount) {
      showToast('error', 'Please Select Number Of PCs');
      return;
    }

    const { id, time, remainingSlots, day } = selectedSlot;

    if (parseInt(bookingPcCount) > parseInt(remainingSlots)) {
      console.log('Cannot book more PCs than available');
      showToast('error', 'Cannot book more PCs than available');
      return;
    }

    try {
      const gameZoneRef = firestore().collection('users').doc(gameZoneId);
      const gamerRef = firestore().collection('users').doc(GamerId);
      await firestore().runTransaction(async (transaction) => {
        const gameZoneDoc = await transaction.get(gameZoneRef);
        const gamerDoc = await transaction.get(gamerRef);

        const gameZoneSlots = gameZoneDoc.data().slots;
        const gamerData = gamerDoc.data();

        // Update the remaining slots count in gameZone
        const updatedGameZoneSlots = gameZoneSlots.map((slot) => {
          if (slot.day === day) {
            const updatedDaySlots = slot.slots.map((s) => {
              if (s.id === id) {
                return {
                  ...s,
                  remainingSlots: s.remainingSlots - bookingPcCount,
                };
              }
              return s;
            });

            return {
              ...slot,
              slots: updatedDaySlots,
            };
          }
          return slot;
        });

        // Update the document with the updated slots in gameZone
        transaction.update(gameZoneRef, { slots: updatedGameZoneSlots });

        // Create a new booking
        const booking = {
          slotTime: time,
          pcCount: bookingPcCount,
          date: selectedDate,
          day: selectedSlot.day,
          bookingDate: new Date(),
          bookerName: profile.user.name
        };

        // Update gamer data with the new booking
        let updatedGamerData;
        if (gamerData && gamerData.bookings) {
          updatedGamerData = {
            ...gamerData,
            bookings: [...gamerData.bookings, booking],
          };
        } else {
          updatedGamerData = {
            ...gamerData,
            bookings: [booking],
          };
        }

        // Update the document with the updated gamer data
        transaction.update(gamerRef, updatedGamerData);
        const updatedSelectedSlot = {
          ...selectedSlot,
          remainingSlots: selectedSlot.remainingSlots - bookingPcCount,
        };

        // Update the state with the updated selectedSlot
        setSelectedSlot(updatedSelectedSlot);

        // Push the booking to the game zone owner's Firestore document
        transaction.update(gameZoneRef, {
          bookings: firestore.FieldValue.arrayUnion(booking),
        });


        showToast('success', 'Booking successful');
        getData();
        setSelectedSlot(null);
        setBookingPcCount(null);
        navigation.replace('home');
        console.log('Booking successful');
      });
    } catch (error) {
      showToast('error', 'Booking Failed', `${error}`);
      console.log('Error booking slot:', error);
    }
  };


  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0913b3" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      <View style={styles.slotContainer}>
        {availableSlots?.slots?.map((slot) => {
          return (
            <TouchableOpacity
              key={slot.id}
              style={[styles.slot, selectedSlot?.id === slot.id && styles.selectedSlot]}
              onPress={() => handleSlotSelect(slot)}
              disabled={selectedSlot?.id === slot.id}
            >
              <Text
                style={[
                  styles.slotText,
                  selectedSlot?.id === slot.id && styles.selectedSlotText,
                ]}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {selectedSlot && (
        <View style={styles.bookingContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.bookingLabel}>Number of PCs:</Text>
            <Text >Available Slots <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              {selectedSlot.remainingSlots}</Text>
            </Text>
          </View>

          <TextInput
            style={styles.bookingInput}
            value={bookingPcCount}
            onChangeText={setBookingPcCount}
            placeholder={`Number of PCs  `}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
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
    backgroundColor: '#081B33',
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
    width: '100%',
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
    width: "40%",
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

export default Booking;
