import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../../src/components/molecules/CustomInput';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image, TouchableOpacity} from 'react-native';
import {auth} from '../../src/config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import app from '../../src/config/firebase';

const SignUp = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleRegister = () => {
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

    // Proses SignUp
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User created successfully:', user);

        // Navigasi ke halaman Home hanya jika pendaftaran berhasil
        navigation.replace('Home');
      })
      .catch(error => {
        console.error('Error creating user:', error.code, error.message);

        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'Email sudah terdaftar. Silakan gunakan email lain.',
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
      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={{alignSelf: 'center', marginBottom: 20}}>
        {photo ? (
          <Image
            source={{uri: photo.uri}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Pilih Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Buat Akun Baru</Text>
      <CustomInput
        label="Nama Lengkap"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Masukkan nama anda"
      />
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
      <PrimaryButton title="Daftar" onPress={handleRegister} />
      <PrimaryButton
        title="Sudah punya akun? Masuk"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default SignUp;

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
