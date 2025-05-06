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

        // Navigasi ke halaman Home
        navigation.replace('Home');
      })
      .catch(error => {
        console.error('Error signing in:', error.code, error.message);

        if (error.code === 'auth/user-not-found') {
          showMessage({
            message:
              'Pengguna tidak ditemukan. Silakan daftar terlebih dahulu.',
            type: 'danger',
          });
        } else if (error.code === 'auth/wrong-password') {
          showMessage({
            message: 'Password salah. Silakan coba lagi.',
            type: 'danger',
          });
        } else {
          showMessage({
            message: error.message,
            type: 'danger',
          });
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <Text style={styles.title}>Masuk ke Akun Anda</Text>

      {/* Container biru muda */}
      <View style={styles.inputContainer}>
        {/* Input Email */}
        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan email anda"
        />

        {/* Input Password */}
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Masukkan password"
          secureTextEntry
        />

        {/* Tombol Masuk */}
        <PrimaryButton title="Masuk" onPress={handleSignIn} />

        {/* Tombol Daftar */}
        <PrimaryButton
          title="Belum punya akun? Daftar"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
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
  header: {
    backgroundColor: '#ADD8E6',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#ADD8E6', // Warna biru muda
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
