import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../components/molecules/CustomInput';
import PrimaryButton from '../components/atoms/PrimaryButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image, TouchableOpacity} from 'react-native';

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
    console.log({fullName, email, password});
    navigation.replace('Home');
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
