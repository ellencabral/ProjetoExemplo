import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MeuButton from '../../components/MeuButton';
import {CourseContext} from '../../context/CourseProvider';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/DeleteButton';

const Course = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [sigla, setSigla] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [modulos, setModulos] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCourse, deleteCourse} = useContext(CourseContext);

  useEffect(() => {
    console.log(route.params.course);
    setCampus('');
    setModulos('');
    setName('');
    setSigla('');
    setUid('');
    if (route.params.course) {
      setCampus(route.params.course.campus);
      setModulos(route.params.course.modulos);
      setName(route.params.course.name);
      setSigla(route.params.course.sigla);
      setUid(route.params.course.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (sigla && name && campus && modulos) {
      let curso = {};
      curso.uid = uid;
      curso.sigla = sigla;
      curso.name = name;
      curso.campus = campus;
      curso.modulos = modulos;
      setLoading(true);
      await saveCourse(curso);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o curso?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteCourse(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Sigla do Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSigla(t)}
        value={sigla}
      />
      <TextInput
        placeholder="Nome do Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <TextInput
        placeholder="Câmpus"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCampus(t)}
        value={campus}
      />
      <TextInput
        placeholder="Número de Módulos"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setModulos(t)}
        value={modulos}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Course;
