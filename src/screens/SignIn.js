import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import MeuButton from '../components/MeuButton';
import {COLORS} from '../assets/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

const SignIn = ({navigation}) => {
  // navigation é um objeto com vários objetos dentro
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const recuperarSenha = () => {
    navigation.navigate('ForgotPassword');
  };

  const storeUserCache = async value => {
    try {
      value.pass = pass; 
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      setLoading(false);
      //navigation.dispatch(
      //  CommonActions.reset({
      //    index: 0,
      //    routes: [{name: 'Alunos'}], // Aluno é o nome da rota no App.js
      //  }),
      //);
    } catch (e) {
      console.log('SignIn: erro em storeUserCache: ' + e);
    }
  };

  const getUser = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          storeUserCache(doc.data());
        } else {
          console.log('O documento não existe na base de dados');
        }
      })
      .catch(e => {
        console.log('SignIn: erro em getUser: ' + e);
      });
  };

  const entrar = () => {
    if (email !== '' && pass !== '') {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          if (!auth().currentUser.emailVerified) {
            Alert.alert(
              'Erro',
              'Você deve verificar o seu email para prosseguir.',
            );
            setLoading(false);
            return;
          }
          getUser();
        })
        .catch(e => {
          setLoading(false);
          console.log('SignIn: erro ao entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário disabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Preencha os campos.');
    }
  };

  const cadastrar = () => {
    navigation.navigate('SignUp'); // passar prop name do component de Screen arquivo App
  };

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
            onChangeText={t => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
          />
          <TextInput
            ref={ref => {
              this.passTextInput = ref;
            }}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MeuButton texto="ENTRAR" onClick={entrar} />
        </View>

        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>

          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
