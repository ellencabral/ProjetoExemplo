import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MeuButton from '../components/MeuButton';

const Home = (props) => {
  const [contador, setContador] = useState(0);

  console.log(props);

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

  return (
    <View>
      <Text style={styles.texto}>Olá, mundo.</Text>
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
