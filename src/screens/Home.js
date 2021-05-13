import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MeuButton from '../components/MeuButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = props => {
  const [contador, setContador] = useState(0);

  //console.log(props);

  //1. componetDidMount
  //useEffect(() => {
  //  console.log('Montou o componente.');
  //}, []);

  //2. componentDidUpdate
  //useEffect(() => {
  //  console.log('Fez update no componente.');
  //});

  //3. componentDidUpdate
  //useEffect(() => {
  //  console.log('Fez update baseado em contador.');
  //}, [contador])

  function contar() {
    setContador(contador + 1);
  }

  const reset = () => {
    setContador(0);
  };

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('getUserCache');
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: erro em getUserCache: ' + e);
    }
  };

  getUserCache();

  return (
    <View>
      <Text style={styles.texto}>Bem vindo!!</Text>
      <Text style={styles.texto}>Contador = {contador}</Text>
      <MeuButton texto="Contar" onClick={contar} />
      <MeuButton texto="Reset" onClick={reset} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  texto: {
    fontSize: 24,
  },
});
