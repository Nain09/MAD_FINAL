import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CustomInput from '../../src/components/molecules/CustomInput';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {auth, db} from '../../src/config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {Platform} from 'react-native';

const SignUp = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.assets && response.assets.length > 0) {
        const photoUri = response.assets[0].uri;

        try {
          const resizedImage = await ImageResizer.createResizedImage(
            photoUri,
            300,
            300,
            'JPEG',
            80,
          );

          const base64Photo = await RNFS.readFile(
            Platform.OS === 'android'
              ? resizedImage.uri
              : resizedImage.uri.replace('file://', ''),
            'base64',
          );
          setPhoto(base64Photo);
        } catch (error) {
          console.error('Error resizing image:', error);
          Alert.alert('Error', 'Gagal memproses foto.');
        }
      } else {
        Alert.alert('Pilih Foto', 'Tidak ada foto yang dipilih.');
      }
    });
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Semua field harus diisi.');
      return;
    }

    if (photo && photo.length > 1048487) {
      Alert.alert(
        'Error',
        'Ukuran foto terlalu besar. Silakan pilih foto lain.',
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        photoBase64: photo || null,
      });

      Alert.alert('Berhasil', 'Akun berhasil dibuat.');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error creating user:', error.code, error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.photoContainer}>
          {photo ? (
            <Image
              source={{uri: `data:image/png;base64,${photo}`}}
              style={styles.photo}
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text>Pilih Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        <CustomInput
          label="Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Masukkan nama lengkap"
          placeholderTextColor="#555"
        />
        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan email"
          placeholderTextColor="#555"
        />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Masukkan password"
          placeholderTextColor="#555"
          secureTextEntry
        />
        <PrimaryButton title="Daftar" onPress={handleRegister} />
      </View>
    </View>
  );
};

export default SignUp;

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
    backgroundColor: '#e6f7ff', // Warna biru muda
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
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
