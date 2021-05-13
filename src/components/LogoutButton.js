import React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const LogoutButton = () => {
  const signOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth() // faz o signOut no firebase
          .signOut()
          .then(() => {})
          .catch(e => {
            console.log('LogoutButton, signOut em auth signOut: ' + e);
          });
        RNRestart.Restart(); // reinicia o app
      })
      .catch(e => {
        console.log('LogoutButton, signOut em removeItem: ' + e);
      });
  };

  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/exit.png')}
        accessibilityLabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
