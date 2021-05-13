/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Usuários',
      headerStyle: {backgroundColor: COLORS.primary},
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => <LogoutButton />,
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem vindo!!</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 24,
  },
});
