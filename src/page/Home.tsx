import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import CarCard from '../../src/components/molecules/CarCard';
import PrimaryButton from '../../src/components/atoms/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const dummyCars = [
  {
    id: '1',
    name: 'Toyota Avanza',
    price: 180000000,
    image: 'https://source.unsplash.com/600x400/?car,toyota',
  },
  {
    id: '2',
    name: 'Honda Jazz',
    price: 220000000,
    image: 'https://source.unsplash.com/600x400/?car,honda',
  },
  {
    id: '3',
    name: 'Suzuki Ertiga',
    price: 170000000,
    image: 'https://source.unsplash.com/600x400/?car,suzuki',
  },
];

const Home = ({navigation}) => {
  const [mode, setMode] = useState<'beli' | 'jual'>('beli');

  const [alamat, setAlamat] = useState('');
  const [harga, setHarga] = useState('');
  const [foto, setFoto] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const renderItem = ({item}) => (
    <CarCard
      car={item}
      onPress={() => navigation.navigate('CarDetail', {car: item})}
    />
  );

  const handleJualMobil = () => {
    if (!alamat || !harga || !foto || !deskripsi) {
      Alert.alert('Error', 'Semua data harus diisi!');
      return;
    }
    Alert.alert('Sukses', 'Mobil berhasil dijual!');
    // Di sini bisa ditambahkan logic untuk menyimpan ke database
    setAlamat('');
    setHarga('');
    setFoto('');
    setDeskripsi('');
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switcher}>
        <TouchableOpacity
          style={[styles.tab, mode === 'beli' && styles.activeTab]}
          onPress={() => setMode('beli')}>
          <Text style={styles.tabText}>Beli Mobil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'jual' && styles.activeTab]}
          onPress={() => setMode('jual')}>
          <Text style={styles.tabText}>Jual Mobil</Text>
        </TouchableOpacity>
      </View>

      {mode === 'beli' ? (
        <>
          <Text style={styles.header}>Daftar Mobil Dijual</Text>
          <FlatList
            data={dummyCars}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
          <PrimaryButton
            title="Ke Profil"
            onPress={() => navigation.navigate('Profile')}
          />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer}>
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

          <TouchableOpacity
            style={styles.uploadWrapper}
            onPress={handlePickImage}>
            <MaterialIcons name="photo" size={20} style={styles.icon} />
            <Text style={styles.uploadText}>
              {foto ? 'Ganti Foto Mobil' : 'Upload Foto Mobil'}
            </Text>
          </TouchableOpacity>

          {foto ? (
            <Image source={{uri: foto}} style={styles.previewImage} />
          ) : null}

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
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
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
  switcher: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#ccc',
  },
  tabText: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
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
