import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from '../../src/components/molecules/CustomInput';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../src/config/firebase';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Berhasil', 'Login berhasil.');
      navigation.replace('Home'); // Arahkan ke halaman Home setelah login
    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
      Alert.alert('Error', 'Email atau password salah.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
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
          style={styles.secondaryButton}
        />
      </View>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f0f8ff', // Warna biru muda
    borderRadius: 8,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e6f7ff', // Warna biru muda
    borderRadius: 8,
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: '#ddd', // Warna abu-abu untuk tombol sekunder
  },
});
