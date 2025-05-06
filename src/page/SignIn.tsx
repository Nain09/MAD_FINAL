import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from '../../src/components/molecules/CustomInput';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import {auth} from '../../src/config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User signed in:', userCredential.user);
      navigation.replace('Home');
    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Error',
          'Pengguna tidak ditemukan. Silakan daftar terlebih dahulu.',
        );
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Password salah. Silakan coba lagi.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan email"
      />
      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan password"
        secureTextEntry
      />
      <PrimaryButton title="Masuk" onPress={handleSignIn} />
      <PrimaryButton
        title="Belum punya akun? Daftar"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
