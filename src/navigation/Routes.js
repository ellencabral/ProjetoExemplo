import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthUserContext} from '../context/AuthUserProvider';

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
      {
        //se user está nulo vai para AuthStack, senão vai para AppStack
        user ? <AppStack /> : <AuthStack />
      }
    </NavigationContainer>
  );
}
