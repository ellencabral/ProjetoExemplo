import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {COLORS} from '../assets/colors';
import Course from '../screens/Course';
import Courses from '../screens/Courses';
import Preload from '../screens/Preload';
import Student from '../screens/Student';
import Students from '../screens/Students';
import StudentsTab from '../screens/Students/StudentsTab';
import MapStudentsTab from '../screens/Students/MapStudentsTab';
import User from '../screens/User';
import Users from '../screens/Users';
import LogoutButton from '../components/LogoutButton';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: COLORS.primary, paddingRight: 5},
        headerTintColor: COLORS.white,
        headerRight: () => () => <LogoutButton />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Preload"
        component={Preload}
        options={preloadStyle}
      />
      <Drawer.Screen
        name="Alunos"
        component={Students}
        options={studentsStyle}
      />
      <Drawer.Screen name="Aluno" component={Student} options={studentStyle} />
      <Drawer.Screen
        name="EstudantesTab"
        component={StudentsTab}
        options={studentStyle}
      />
      <Drawer.Screen
        name="EstudantesMapTab"
        component={MapStudentsTab}
        options={studentStyle}
      />
      <Drawer.Screen name="Cursos" component={Courses} options={coursesStyle} />
      <Drawer.Screen name="Curso" component={Course} options={courseStyle} />
      <Drawer.Screen name="Usuarios" component={Users} options={usersStyle} />
      <Drawer.Screen name="Usuario" component={User} options={userStyle} />
    </Drawer.Navigator>
  );
};

export default AppStack;

const preloadStyle = {
  headerShown: false,
};

const studentsStyle = {
  title: 'Alunos',
};

const studentStyle = {
  title: 'Aluno',
};

const coursesStyle = {
  title: 'Cursos',
};

const courseStyle = {
  title: 'Curso',
};

const usersStyle = {
  title: 'Usu??rios',
};

const userStyle = {
  title: 'Usu??rio',
};
