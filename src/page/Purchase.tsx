import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';

const Purchase = ({route, navigation}) => {
  const {car} = route.params;
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  const handlePurchase = () => {
    if (!fullName || !address) {
      Alert.alert('Error', 'Mohon lengkapi semua data');
      return;
    }

    const order = {
      car,
      buyer: {fullName, address},
    };

    console.log('Data Pembelian:', order);
    Alert.alert('Sukses', `Pembelian ${car.name} berhasil!`);
    navigation.popToTop(); // kembali ke Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembelian {car.name}</Text>
      <Text style={styles.label}>Nama Lengkap</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholder="Masukkan nama lengkap"
        placeholderTextColor={'#555'}
      />
      <Text style={styles.label}>Alamat Pengiriman</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholder="Masukkan alamat"
        placeholderTextColor={'#555'}
      />
      <PrimaryButton title="Konfirmasi Pembelian" onPress={handlePurchase} />
    </View>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#555',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
});
