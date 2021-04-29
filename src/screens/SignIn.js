import React, { useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TextInput} from 'react-native';
import MeuButton from '../components/MeuButton';
import {COLORS} from '../assets/colors';

import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const recuperarSenha = () => {
    alert('Abrir modal recuperar senha'); 
  }

  const entrar = () => {
    console.log(`Email=${email} Senha=${pass}`); 
    console.log(auth);
    
    auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      console.log('Entrou');
      alert('Logou');
      setEmail('');
      setPass('');
    })
    .catch((e) => {
      console.log('SignIn: erro ao entrar: ' + e);
    });
  }

  const cadastrar = () => {
    alert('vai para a screen SignUp');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image 
          source={require('../assets/images/logo.png')}
          accessibilityLabel="logo do app" 
          />

          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            keyboardType="email-address" 
            returnKeyType="next" 
            onChangeText={(t) => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
          />
          <TextInput 
            ref={(ref) => {
              this.passTextInput = ref;
            }}
            style={styles.input} 
            secureTextEntry={true} 
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>Esqueceu sua senha?</Text>
          <MeuButton texto="ENTRAR" onClick={entrar} />
        </View>
        
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr}></View>
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr}></View>
          </View>

          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>Cadastre-se</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.accentSecundary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    backgroundColor: COLORS.grey,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});