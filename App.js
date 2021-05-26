import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

import Preload from './src/screens/Preload';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import Students from './src/screens/Students';
import Student from './src/screens/Student';
import Courses from './src/screens/Courses';
import Course from './src/screens/Course';
import Users from './src/screens/Users';
import User from './src/screens/User';
import {COLORS} from './src/assets/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={preloadStyle}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={ForgotPasswordStyle}
        />
        <Stack.Screen
          name="Alunos"
          component={Students}
          options={studentsStyle}
        />
        <Stack.Screen name="Aluno" component={Student} options={studentStyle} />
        <Stack.Screen
          name="Cursos"
          component={Courses}
          options={coursesStyle}
        />
        <Stack.Screen name="Curso" component={Course} options={courseStyle} />
        <Stack.Screen name="Usuarios" component={Users} options={usersStyle} />
        <Stack.Screen name="Usuario" component={User} options={userStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const preloadStyle = {
  headerShown: false,
};

const signInStyle = {
  headerLeft: false,
  title: 'Bem-vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const signUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const ForgotPasswordStyle = {
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const studentsStyle = {
  title: 'Alunos',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const studentStyle = {
  title: 'Aluno',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const coursesStyle = {
  title: 'Cursos',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const courseStyle = {
  title: 'Curso',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const usersStyle = {
  title: 'Usuários',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const userStyle = {
  title: 'Usuário',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
