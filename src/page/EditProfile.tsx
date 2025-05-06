import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from 'react-native';
import {auth, db} from '../../src/config/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const EditProfile = ({route, navigation}) => {
  const {userData} = route.params; // Data pengguna diterima dari navigasi
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [photoBase64, setPhotoBase64] = useState(userData.photoBase64 || null);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.assets && response.assets.length > 0) {
        const photoUri = response.assets[0].uri;

        try {
          // Kompres foto
          const resizedImage = await ImageResizer.createResizedImage(
            photoUri,
            300, // Lebar maksimum
            300, // Tinggi maksimum
            'JPEG', // Format gambar
            80, // Kualitas (0-100)
          );

          // Konversi foto ke Base64
          const base64Photo = await RNFS.readFile(resizedImage.uri, 'base64');
          setPhotoBase64(base64Photo);
        } catch (error) {
          console.error('Error resizing image:', error);
          Alert.alert('Error', 'Gagal memproses foto.');
        }
      } else {
        Alert.alert('Pilih Foto', 'Tidak ada foto yang dipilih.');
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);

        // Update data pengguna di Firestore
        await updateDoc(docRef, {
          fullName: fullName,
          photoBase64: photoBase64,
        });

        Alert.alert('Berhasil', 'Profil berhasil diperbarui.');
        navigation.goBack(); // Kembali ke halaman Profile
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Gagal memperbarui profil.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profil</Text>
      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={styles.photoContainer}>
        {photoBase64 ? (
          <Image
            source={{uri: `data:image/png;base64,${photoBase64}`}}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text>Pilih Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={fullName}
        onChangeText={setFullName}
      />
      <Button title="Simpan Perubahan" onPress={handleSaveChanges} />
      <Button
        title="Batal"
        onPress={() => navigation.goBack()}
        color="#d9534f"
      />
    </View>
  );
};

export default EditProfile;

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
    textAlign: 'center',
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
