import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Header;
