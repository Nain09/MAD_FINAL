import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../../src/components/molecules/CustomInput';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../src/config/firebase';
import {showMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage({
        message: 'Format email tidak valid',
        type: 'danger',
      });
      return;
    }

    // Validasi password
    if (password.length < 6) {
      showMessage({
        message: 'Password harus minimal 6 karakter',
        type: 'danger',
      });
      return;
    }

    // Proses Sign In
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User signed in successfully:', user);
        navigation.replace('Home'); // Navigasi ke halaman Home
      })
      .catch(error => {
        console.error('Error signing in:', error.code, error.message);
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk ke Akun Anda</Text>
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan email anda"
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
    backgroundColor: 'white',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});
