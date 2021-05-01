import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import { StatusBar } from 'react-native';
import { COLORS } from './src/assets/colors';
import ForgotPassword from './src/screens/ForgotPassword';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ForgotPasswordStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const signInStyle = {
  headerLeft: false,
  title: 'Bem-vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const ForgotPasswordStyle = {
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const signUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};