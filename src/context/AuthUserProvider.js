import React, {createContext, useState} from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  //todos abaixo de AuthUserContext.Provider receberão os valores de user
  return (
    <AuthUserContext.Provider value={(user, setUser)}>
      {children}
    </AuthUserContext.Provider>
  );
};
