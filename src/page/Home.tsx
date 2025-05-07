import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CarCard from '../../src/components/molecules/CarCard';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';

const dummyCars = [
  {
    id: '1',
    name: 'Toyota Avanza',
    price: 180000000,
    image: 'https://source.unsplash.com/600x400/?car,toyota',
  },
  {
    id: '2',
    name: 'Honda Jazz',
    price: 220000000,
    image: 'https://source.unsplash.com/600x400/?car,honda',
  },
  {
    id: '3',
    name: 'Suzuki Ertiga',
    price: 170000000,
    image: 'https://source.unsplash.com/600x400/?car,suzuki',
  },
];

const Home = ({navigation}) => {
  const renderItem = ({item}) => (
    <CarCard
      car={item}
      onPress={() => navigation.navigate('CarDetail', {car: item})}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Daftar Mobil Dijual</Text>
      <FlatList
        data={dummyCars}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Profil Saya"
          onPress={() => navigation.navigate('Profile')}
        />
        <PrimaryButton
          title="Jual Mobil"
          onPress={() => navigation.navigate('SellCar')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
