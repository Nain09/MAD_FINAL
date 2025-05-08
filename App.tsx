import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './src/config/firebase';

import SignIn from './src/page/SignIn';
import SignUp from './src/page/SignUp';
import Home from './src/page/Home';
import CarDetail from './src/page/CarDetail';
import Purchase from './src/page/Purchase';
import Profile from './src/page/Profile';
import EditProfile from './src/page/EditProfile';
import SellCar from './src/page/SellCar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e6f7ff', // Warna biru muda untuk header
          },
          headerTintColor: '#333', // Warna teks header
          headerTitleStyle: {
            fontWeight: 'bold', // Gaya teks header
            fontSize: 24, // Ukuran teks header
          },
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Beranda'}}
        />
        <Stack.Screen
          name="CarDetail"
          component={CarDetail}
          options={{title: 'Detail Mobil'}}
        />
        <Stack.Screen
          name="Purchase"
          component={Purchase}
          options={{title: 'Pembelian'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profil Saya'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: 'Edit Profil'}}
        />
        <Stack.Screen
          name="SellCar"
          component={SellCar}
          options={{title: 'Jual Mobil'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
