import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const CarCard = ({car, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: car.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.price}>Rp {car.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#1d4ed8',
    marginTop: 4,
  },
});

export default CarCard;
