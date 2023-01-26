import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const persons = [
  {
    id: '1',
    name: 'Earnest Green',
  },
  {
    id: '2',
    name: 'Winston Orn',
  },
  {
    id: '3',
    name: 'Carlton Collins',
  },
  {
    id: '4',
    name: 'Malcolm Labadie',
  },
  {
    id: '5',
    name: 'Michelle Dare',
  },
  {
    id: '6',
    name: 'Carlton Zieme',
  },
  {
    id: '7',
    name: 'Jessie Dickinson',
  },
  {
    id: '8',
    name: 'Julian Gulgowski',
  },
  {
    id: '9',
    name: 'Ellen Veum',
  },
  {
    id: '10',
    name: 'Lorena Rice',
  },

  {
    id: '11',
    name: 'Carlton Zieme',
  },
  {
    id: '12',
    name: 'Jessie Dickinson',
  },
  {
    id: '13',
    name: 'Julian Gulgowski',
  },
  {
    id: '14',
    name: 'Ellen Veum',
  },
  {
    id: '15',
    name: 'Lorena Rice',
  },
];

export default function App() {
  const myItemSeparator = () => {
    return (
      <View
        style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10}}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={persons}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              marginTop: 20,
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            Game Zone List
          </Text>
        )}
        ListFooterComponent={() => (
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            End of Result
          </Text>
        )}
        renderItem={({item}) => {
          return (
            <>
              <View style={styles.item}>
                <View style={styles.left}>
                  <Image
                    style={styles.itemImage}
                    source={require('../../assets/Icons/Logo.png')}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <TouchableOpacity style={styles.itemButton}>
                  <Text style={styles.itemButtonText}>Explore</Text>
                </TouchableOpacity>
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
    marginTop: 5,
    fontSize: 30,
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 5,
  },
  left: {flex: 1, flexDirection: 'row', alignItems: 'center'},

  itemImage: {
    height: 30,
    width: 60,
  },
  itemText: {
    fontSize: 20,
    marginLeft: 5,
  },
  itemButton: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#105e26',
    borderColor: '#fff',
  },
  itemButtonText: {
    color: '#fff',
  },
});
