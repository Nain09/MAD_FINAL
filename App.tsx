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
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: 'Edit Profil'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
