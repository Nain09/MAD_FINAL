import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {auth, db} from '../../src/config/firebase';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const EditProfile = ({route, navigation}) => {
  const [userData, setUserData] = useState(null);
  const [newFullName, setNewFullName] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setNewFullName(data.fullName || '');
            setNewPhoto(data.photoBase64 || '');
          } else {
            console.log('No such document!');
            Alert.alert('Error', 'Data pengguna tidak ditemukan.');
            navigation.goBack();
          }
        } else {
          console.log('No user is signed in!');
          Alert.alert(
            'Error',
            'Anda belum login. Silakan login terlebih dahulu.',
          );
          navigation.replace('SignIn');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengambil data pengguna.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigation]);

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

          const base64Photo = await RNFS.readFile(resizedImage.uri, 'base64');
          setNewPhoto(base64Photo);
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
      if (!user) {
        Alert.alert('Error', 'Anda belum login.');
        navigation.replace('SignIn');
        return;
      }

      const docRef = doc(db, 'users', user.uid);

      console.log('Updating Firestore with:', {
        fullName: newFullName || userData.fullName,
        photoBase64: newPhoto || userData.photoBase64,
      });

      await updateDoc(docRef, {
        fullName: newFullName || userData.fullName,
        photoBase64: newPhoto || userData.photoBase64,
      });

      Alert.alert('Berhasil', 'Profil berhasil diperbarui.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Gagal memperbarui profil.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Memuat data pengguna...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profil</Text>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Image
          source={{
            uri: newPhoto
              ? `data:image/png;base64,${newPhoto}`
              : 'https://via.placeholder.com/120',
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={newFullName}
        onChangeText={setNewFullName}
        placeholderTextColor="#555"
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: '100%',
    color: '#555',
  },
});
