/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {Container, FlatList} from './styles';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  const getUsers = () => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, ' => ', doc.data());
          const user = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
          };
          d.push(user);
        });
        //console.log(d);
        setData(d);
      })
      .catch((e) => {
        console.log('Home, getUsers: ' + e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Usuários',
      headerStyle: {backgroundColor: COLORS.primary},
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => <LogoutButton />,
    });

    getUsers();
  }, []);

  const routeUser = item => {
    console.log(item);
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default Home;
