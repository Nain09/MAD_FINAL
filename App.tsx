import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Home from './page/Home';
import CarDetail from './page/CarDetail';
import Purchase from './page/Purchase';
import Profile from './page/Profile';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
