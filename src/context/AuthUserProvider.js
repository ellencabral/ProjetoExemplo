import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth() // faz o signOut no firebase
          .signOut()
          .then(() => {})
          .catch(e => {
            console.log('LogoutButton, signOut em auth signOut: ' + e);
          });
      })
      .catch(e => {
        console.log('LogoutButton, signOut em removeItem: ' + e);
      });
  };

  //todos abaixo de AuthUserContext.Provider receberão os valores de user
  return (
    <AuthUserContext.Provider value={{user, setUser, signOut}}>
      {children}
    </AuthUserContext.Provider>
  );
};
