import React, {useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, Image} from './styles';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthUserContext} from '../../context/AuthUserProvider';

const Preload = ({navigation}) => {
  const {setUser} = useContext(AuthUserContext);

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('getUserCache');
      console.log(jsonValue);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: erro ao ler o user no cache: ' + e);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    setUser(user);
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Alunos'}],
        }),
      );
      /* auth()
        .signInWithEmailAndPassword(user.email, user.pass)
        .then(() => {

        })
        .catch(e => {
          console.log('SignIn: erro ao entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário disabilitado.');
              break;
          }
        }); */
    }
      //navigation.dispatch(
      //  CommonActions.reset({
      //    index: 0,
      //    routes: [{name: 'SignIn'}],
      //  }),
      //);
  };

  useEffect(() => {
    loginUser();
    Icon.loadFont(); //tem que ler os icons da fonte ao inicializar o app
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
