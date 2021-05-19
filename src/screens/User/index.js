/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {useEffect} from 'react/cjs/react.development';
import {Container, TextInput} from './styles';

const User = ({route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  console.log(route.params.user);

  useEffect(() => {
    setName(route.params.user.name);
    setEmail(route.params.user.email);
  }, []);

  return (
    <Container>
      <TextInput
        placeholder="Nome completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        editable={false}
        value={email}
      />
    </Container>
  );
};

export default User;
