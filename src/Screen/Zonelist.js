import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
export default function App({ navigation }) {
  const [owners, setOwners] = useState('');

  const fetchGameZoneOwners = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('type', '==', 'owner')
        .get();
      const userData = querySnapshot.docs.map(doc => doc.data());
      setOwners(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data: ', error);
      return [];
    }
  };
  useEffect(() => {
    fetchGameZoneOwners();
  }, []);
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: 'grey', marginHorizontal: 10 }}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const handleExplore = item => {
    navigation.navigate('GameZoneProfile', { gameZoneData: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={owners}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Text
            style={styles.mainHeading}>
            Game Zone List
          </Text>
        )}
        // ListFooterComponent={() => (
        //   <Text
        //     style={{
        //       fontSize: 30,
        //       textAlign: 'center',
        //       marginBottom: 20,
        //       fontWeight: 'bold',
        //     }}>
        //     End of Result
        //   </Text>
        // )}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.item}>
                <View style={styles.left}>
                  <Image
                    style={styles.itemImage}
                    source={item.profileImage ? { uri: item.profileImage } : require('../../assets/Icons/Logo.png')}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => handleExplore(item)}>
                  <View style={styles.itemButton}>
                    <Text style={styles.itemButtonText}>Explore</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 5,
    fontSize: 30,
  },
  mainHeading: {
    color:'#fff',
    fontSize: 30,
    padding:10,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: '#081B33'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 5,
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },

  itemImage: {
    height: 30,
    width: 60,
    resizeMode: 'contain'
  },
  itemText: {
    fontSize: 20,
    marginLeft: 5,
  },
  itemButton: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 300,
    backgroundColor: '#081B33',
    borderColor: '#fff',
  },
  itemButtonText: {
    color: '#fff',
  },
});
