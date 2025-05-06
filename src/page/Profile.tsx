import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, Button} from 'react-native';
import {auth, db} from '../../src/config/firebase';
import {doc, getDoc} from 'firebase/firestore';
import {signOut} from 'firebase/auth';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          navigation.replace('SignIn');
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
          <Button
            title="Edit Profil"
            onPress={() => navigation.navigate('EditProfile', {userData})}
          />
          <Button title="Logout" onPress={handleLogout} color="#d9534f" />
        </>
      ) : (
        <Text>Data pengguna tidak tersedia.</Text>
      )}
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
});
