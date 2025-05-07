import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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
  const [searchText, setSearchText] = useState('');

  const filteredCars = dummyCars.filter(car =>
    car.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <CarCard
      car={item}
      onPress={() => navigation.navigate('CarDetail', {car: item})}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Daftar Mobil Dijual</Text>

      {/* Input Pencarian */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari Mobil..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredCars}
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
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
