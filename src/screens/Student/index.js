/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, TextInput} from './styles';

import {Picker} from '@react-native-picker/picker';

import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {StudentContext} from '../../context/StudentProvider';
import {CourseContext} from '../../context/CourseProvider';

const Student = ({route, navigation}) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modulos, setModulos] = useState('');
  const [name, setName] = useState('');
  const [sigla, setSigla] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveStudent, deleteStudent} = useContext(StudentContext);
  const [coursesSelect, setCoursesSelect] = useState([]);
  const {courses} = useContext(CourseContext);

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

  useEffect(() => {
    let aux = [];
    courses.forEach(element => {
      aux.push(element);
    });
    setCoursesSelect(aux);
  }, [courses]);

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo do Aluno"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <Picker
        selectedValue={sigla}
        style={styles.picker}
        onValueChange={itemValue => setSigla(itemValue)}>
        {coursesSelect.map(e => {
          return <Picker.Item key={e.uid} label={e.sigla} value={e.sigla} />;
        })}
      </Picker>
      <Picker
        selectedValue={modulos}
        style={styles.picker}
        onValueChange={itemValue => setModulos(itemValue)}>
        <Picker.Item label="Egresso" value="egresso" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
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

const styles = StyleSheet.create({
  picker: {
    height: 50, 
    width: '100%',
  },
});