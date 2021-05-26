import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {COLORS} from '../assets/colors';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null); //se tem um usuário na sessão coloca o valor do firebase, se não, coloca nulo
    });

    return unsubscriber; //desescrever
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      {
        /*se user está nulo vai para AuthStack, senão vai para AppStack*/
        user ? <AppStack /> : <AuthStack />
      }
    </NavigationContainer>
  );
}
