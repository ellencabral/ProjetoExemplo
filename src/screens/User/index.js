/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import {Container, TextInput} from './styles';
import MeuButton from '../../components/MeuButton';
import firestore from '@react-native-firebase/firestore';

const User = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  //toda atualizaçao no textinput é salva no state e ao clicar no botão salva na base de dados

  //console.log(route.params.user);

  useEffect(() => {
    setName(route.params.user.name);
    setEmail(route.params.user.email);
    setUid(route.params.user.id);
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const salvar = () => {
    firestore()
      .collection('users')
      .doc(uid)
      .set(
        {
          name: name,
        },
        {merge: true}, //merge serve para substituir apenas o nome, nao os demais campos
      )
      .then(() => {
        setName('');
        setEmail('');
        setUid('');
        showToast('Dados salvos.');
        navigation.goBack();
      })
      .catch(e => {
        console.log('User, salvar: ' + e);
      });
  };

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

      <MeuButton texto="Salvar" onClick={salvar} />
    </Container>
  );
};

export default User;
