import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../../src/config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SellCar = ({navigation}) => {
  const [alamat, setAlamat] = useState('');
  const [harga, setHarga] = useState('');
  const [foto, setFoto] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleJualMobil = async () => {
    if (!alamat || !harga || !foto || !deskripsi) {
      Alert.alert('Error', 'Semua data harus diisi!');
      return;
    }

    try {
      // Simpan data mobil ke Firestore
      await addDoc(collection(db, 'cars'), {
        alamat,
        harga: parseInt(harga, 10),
        foto,
        deskripsi,
        createdAt: new Date(),
      });

      Alert.alert('Sukses', 'Mobil berhasil dijual!');
      setAlamat('');
      setHarga('');
      setFoto('');
      setDeskripsi('');
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Gagal menjual mobil. Silakan coba lagi.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jual Mobil</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="location-outline" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Masukan Alamat Anda"
          value={alamat}
          onChangeText={setAlamat}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="$ Masukan Harga"
          keyboardType="numeric"
          value={harga}
          onChangeText={setHarga}
        />
      </View>

      <TouchableOpacity style={styles.uploadWrapper} onPress={handlePickImage}>
        <MaterialIcons name="photo" size={20} style={styles.icon} />
        <Text style={styles.uploadText}>
          {foto ? 'Ganti Foto Mobil' : 'Upload Foto Mobil'}
        </Text>
      </TouchableOpacity>

      {foto ? <Image source={{uri: foto}} style={styles.previewImage} /> : null}

      <View style={styles.inputWrapper}>
        <Ionicons name="car-outline" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi Mobil"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleJualMobil}>
        <Text style={styles.buttonText}>Jual Mobil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SellCar;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
    color: '#555',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  uploadWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  uploadText: {
    marginLeft: 10,
    color: '#555',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#a6f1a6',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
