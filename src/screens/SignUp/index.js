import React, {useState} from 'react';
import { Alert } from 'react-native';
import MeuButton from '../../components/MeuButton';
import {Body, TextInput} from './styles';

import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const cadastrar = () => {
        if(name !== '' && email !== '' && pass !== '' && confirmPass !== ''){
            auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                Alert.alert('Informação', 'Usuário cadastrado com sucesso.');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                    }),                    
                );
            })
            .catch((e) => {
                console.log('SignUp: erro ao cadastrar: ' + e);
                switch(e.code) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Erro', 'Email já está em uso.');
                        break;
                    case 'auth/operation-not-allowed':
                        Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Erro', 'Email inválido.');
                        break;
                    case 'auth/weak-password':
                        Alert.alert('Erro', 'Senha fraca, por favor digite uma senha forte.');
                        break;
                }
            });
        }
        else {
            Alert.alert('Erro', 'Por favor, digite email e senha.');
        }
    }

    return (
    <Body>
        <TextInput 
            placeholder="Nome completo"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(t) => setName(t)}
            onEndEditing={() => this.emailTextInput.focus()} // quando o usuário estiver nesse campo, pula para o próximo ao apertar Enter
        />
        <TextInput 
            ref={(ref) => {
                this.emailTextInput = ref;
                }
            }
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={(t) => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
        />
        <TextInput
            ref={(ref) => {
                this.passTextInput = ref;
                }
            }
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(t) => setPass(t)}
            onEndEditing={() => this.confirmPassTextInput.focus()}
        />
        <TextInput
            ref={(ref) => {
                this.confirmPassTextInput = ref;
                }
            }
            secureTextEntry={true}
            placeholder="Confirmar senha"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(t) => setConfirmPass(t)}
            onEndEditing={() => cadastrar()}
        />
        <MeuButton texto="Cadastrar" onClick={cadastrar}/>
    </Body>
    );
};

export default SignUp;
