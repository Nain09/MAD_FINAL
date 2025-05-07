import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {auth, db} from '../../src/config/firebase';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {signOut} from 'firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log('Current User UID:', user.uid); // Log UID pengguna

          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log('User data:', docSnap.data()); // Log data pengguna
            setUserData(docSnap.data());
          } else {
            console.log('No such document!'); // Dokumen tidak ditemukan
            Alert.alert('Error', 'Data pengguna tidak ditemukan.');
          }
        } else {
          console.log('No user is signed in!'); // Tidak ada pengguna yang login
          Alert.alert(
            'Error',
            'Anda belum login. Silakan login terlebih dahulu.',
          );
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengambil data pengguna.');
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logout pengguna
      navigation.replace('SignIn'); // Arahkan ke halaman Sign In
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Gagal logout. Silakan coba lagi.');
    }
  };

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
          setNewPhoto(base64Photo); // Simpan foto baru
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
          fullName: newFullName || userData.fullName,
          photoBase64: newPhoto || userData.photoBase64,
        });

        Alert.alert('Berhasil', 'Profil berhasil diperbarui.');
        setUserData({
          ...userData,
          fullName: newFullName || userData.fullName,
          photoBase64: newPhoto || userData.photoBase64,
        });
        setIsEditing(false); // Tutup modal
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Gagal memperbarui profil.');
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
      {userData ? (
        <>
          <Image
            source={{
              uri: userData.photoBase64
                ? `data:image/png;base64,${userData.photoBase64}`
                : 'https://via.placeholder.com/120', // Placeholder jika foto kosong
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>
            {userData.fullName || 'Nama Tidak Diketahui'}
          </Text>
          <Text style={styles.email}>
            {userData.email || 'Email Tidak Diketahui'}
          </Text>
          <Button title="Edit Profil" onPress={() => setIsEditing(true)} />
          <Button title="Logout" onPress={handleLogout} color="#d9534f" />
        </>
      ) : (
        <Text>Data pengguna tidak tersedia.</Text>
      )}

      {/* Modal untuk Edit Profil */}
      <Modal visible={isEditing} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profil</Text>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.photoContainer}>
            {newPhoto ? (
              <Image
                source={{uri: `data:image/png;base64,${newPhoto}`}}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{
                  uri: userData.photoBase64
                    ? `data:image/png;base64,${userData.photoBase64}`
                    : 'https://via.placeholder.com/120',
                }}
                style={styles.avatar}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            value={newFullName}
            onChangeText={setNewFullName}
          />
          <Button title="Simpan Perubahan" onPress={handleSaveChanges} />
          <Button
            title="Batal"
            onPress={() => setIsEditing(false)}
            color="#d9534f"
          />
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
