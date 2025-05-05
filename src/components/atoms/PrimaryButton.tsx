import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const PrimaryButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1d4ed8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
