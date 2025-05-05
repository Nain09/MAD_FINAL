import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import PrimaryButton from '../src/components/atoms/PrimaryButton';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const user = {
    name: 'Budi Santoso',
    email: 'budi@example.com',
    photo: 'https://i.pravatar.cc/300',
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: user.photo}} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <PrimaryButton title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
});
