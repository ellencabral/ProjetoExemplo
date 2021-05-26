/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {Container, FlatList} from './styles';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/routers';
import Loading from '../../components/Loading';

const Users = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
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
          setLoading(false);
        },
        e => {
          console.log('Users, getUsers: ' + e);
        },
      );

    return unsubscribe;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Usuários',
      headerStyle: {backgroundColor: COLORS.primary},
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => <LogoutButton />,
    });

    const unsubscribe = getUsers();

    //componentDidUnmount
    return () => {
      console.log('ao desmontar o componente Home');
      unsubscribe();
    }
  }, []);

  const routeUser = item => {
    //quando clica no cartão ele empilha na stack de navegação
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: item}, //objeto do usuário
      }),
    );
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
      {loading && <Loading />}
    </Container>
  );
};

export default Users;
