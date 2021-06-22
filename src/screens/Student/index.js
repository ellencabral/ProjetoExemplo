import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {StudentContext} from '../../context/StudentProvider';

const Student = ({route, navigation}) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modulos, setModulos] = useState('');
  const [name, setName] = useState('');
  const [sigla, setSigla] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveStudent, deleteStudent} = useContext(StudentContext);

  useEffect(() => {
    setLatitude('');
    setLongitude('');
    setModulos('');
    setName('');
    setSigla('');
    setUid('');
    if (route.params.student) {
      setLatitude(route.params.student.latitude);
      setLongitude(route.params.student.longitude);
      setModulos(route.params.student.modulos);
      setName(route.params.student.name);
      setSigla(route.params.student.sigla);
      setUid(route.params.student.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (latitude && longitude && modulos && name && sigla) {
      let student = {};
      student.uid = uid;
      student.sigla = sigla;
      student.name = name;
      student.modulos = modulos;
      student.latitude = latitude;
      student.longitude = longitude;
      setLoading(true);
      await saveStudent(student);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o aluno?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteStudent(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo do Aluno"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <TextInput
        placeholder="Sigla do Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSigla(t)}
        value={sigla}
      />
      <TextInput
        placeholder="Número de Módulos"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setModulos(t)}
        value={modulos}
      />
      <TextInput
        placeholder="Latitude"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setLatitude(t)}
        value={latitude}
      />
      <TextInput
        placeholder="Longitude"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setLongitude(t)}
        value={longitude}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Student;
