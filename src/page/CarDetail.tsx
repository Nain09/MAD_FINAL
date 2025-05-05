import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import PrimaryButton from '../src/components/atoms/PrimaryButton';
import {useNavigation} from '@react-navigation/native';

const CarDetail = ({route}) => {
  const navigation = useNavigation();
  const {car} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: car.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.price}>Rp {car.price.toLocaleString()}</Text>
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.description}>
          Mobil bekas kondisi baik, surat lengkap, pajak hidup. Siap pakai dan
          sangat cocok untuk kebutuhan keluarga atau pribadi.
        </Text>
        <PrimaryButton
          title="Beli Sekarang"
          onPress={() => navigation.navigate('Purchase', {car})}
        />
      </View>
    </ScrollView>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 220,
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#1d4ed8',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
});
