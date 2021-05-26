import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

import {COLORS} from '../assets/colors';
import Preload from '../screens/Preload';
import Students from '../screens/Students';
import Student from '../screens/Student';
import Courses from '../screens/Courses';
import Course from '../screens/Course';
import Users from '../screens/Users';
import User from '../screens/User';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen name="Preload" component={Preload} options={preloadStyle} />
      <Stack.Screen
        name="Alunos"
        component={Students}
        options={studentsStyle}
      />
      <Stack.Screen name="Aluno" component={Student} options={studentStyle} />
      <Stack.Screen name="Cursos" component={Courses} options={coursesStyle} />
      <Stack.Screen name="Curso" component={Course} options={courseStyle} />
      <Stack.Screen name="Usuarios" component={Users} options={usersStyle} />
      <Stack.Screen name="Usuario" component={User} options={userStyle} />
    </Stack.Navigator>
  );
};

export default AppStack;

const preloadStyle = {
  headerShown: false,
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
