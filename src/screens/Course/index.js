import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MeuButton from '../../components/MeuButton';
import {CourseContext} from '../../context/CourseProvider';
import Loading from '../../components/Loading';

const Course = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [sigla, setSigla] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [modulos, setModulos] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCourse} = useContext(CourseContext);

  useEffect(() => {
    console.log(route.params.course);
    setSigla('');
    setName('');
    setCampus('');
    setModulos('');
    if (route.params.course) {
      setUid(route.params.course.uid);
      setSigla(route.params.course.sigla);
      setName(route.params.course.name);
      setCampus(route.params.course.campus);
      setModulos(route.params.course.modulos);
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
      {loading && <Loading />}
    </Container>
  );
};

export default Course;
