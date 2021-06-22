import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList, Text} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import {CourseContext} from '../../context/CourseProvider';

const Courses = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {courses} = useContext(CourseContext);

  useEffect(() => {
    setData(courses);
    setLoading(false);
    //console.log(courses);
  }, [courses]);

  const routeCourse = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Curso',
        params: {course: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeCourse(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      {loading && <Loading />}
    </Container>
  );
};

export default Courses;
