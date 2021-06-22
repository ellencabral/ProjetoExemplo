import React, {useContext, useState, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {StudentContext} from '../../context/StudentProvider';

const StudentsTab = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {students} = useContext(StudentContext);

  useEffect(() => {
    setData(students);
    setLoading(false);
  }, [students]);

  const routeStudent = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Aluno',
        params: {student: item},
      }),
    );
  };

  const routeAddStudent = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Aluno',
        params: {student: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeStudent(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddStudent} />
      {loading && <Loading />}
    </Container>
  );
};

export default StudentsTab;
