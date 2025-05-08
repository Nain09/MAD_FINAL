import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Navigasi ke halaman berikutnya setelah 3 detik
    const timer = setTimeout(() => {
      navigation.replace('SignIn'); // Ganti dengan halaman awal Anda
    }, 3000);

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/assets/logo.jpg')} // Ganti dengan logo Anda
        style={styles.logo}
      />
      <Text style={styles.title}>Selamat Datang di Aplikasi</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Warna latar belakang
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
