import React, { useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/AuthProvider';

export default function BookingList({ navigation }) {
    const { user, setUser } = useContext(AuthContext);
    let index = 1
    const myItemSeparator = () => {
        return <View style={styles.separator} />;
    };

    const myListEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Booking found</Text>
            </View>
        );
    };

    const bookingData = user?.bookings?.length ? [
        {
            header: true,
        },
        ...user?.bookings
    ] : [];

    const renderItem = ({ item }) => {
        if (item.header) {
            return (
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>#</Text>
                    <Text style={styles.headerText}>Day</Text>
                    <Text style={styles.headerText}>Slot Time</Text>
                    <Text style={styles.headerText}>PC Count</Text>
                    <Text style={styles.headerText}>Zone Name</Text>
                </View>
            );
        }

        return (
            <View style={styles.item}>
                <Text style={styles.indexText}>{index++}</Text>
                <Text style={styles.itemText}>{item.day}</Text>
                <Text style={styles.itemText}>{item.slotTime}</Text>
                <Text style={styles.itemText}>{item.pcCount} PCs</Text>
                <Text style={styles.itemText}>{item.zoneName}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={bookingData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={myItemSeparator}
                ListEmptyComponent={myListEmpty}
                renderItem={renderItem}
                ListHeaderComponent={() => (
                    <Text
                        style={styles.mainHeading}>
                        My Bookings
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    mainHeading: {
        color: '#fff',
        fontSize: 30,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        backgroundColor: '#081B33',
        marginBottom: 20
    },
    separator: {
        height: 1,
        backgroundColor: 'grey',
        marginHorizontal: 10,
    },
    emptyContainer: {
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        marginTop: 20,
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    indexText: {
        flex: 1,
        textAlign: 'center',
    },
    itemText: {
        flex: 1,
        textAlign: 'center',
    },
});
